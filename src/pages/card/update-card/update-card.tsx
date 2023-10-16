import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { SvgImgIcon } from '../../../assets/icons/img-icon'
import { Button } from '../../../components/ui/button'
import { ControlledInput } from '../../../components/ui/controlled/controlled-input'
import { Card } from '../../../services/card/types'
import { useUpdateCardMutation } from '../../../services/decks/decks.service'
import s from '../card.module.scss'

type EditCardType = {
  setShowModal: (show: boolean) => void
  card: Card
}

export const UpdateCard: FC<EditCardType> = ({ setShowModal, card }) => {
  const MAX_FILE_SIZE = 500000
  const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  const schema = z.object({
    question: z.string().min(3, { message: 'Must be exactly 3 characters long' }),
    answer: z.string().min(3, { message: 'Must be exactly 3 characters long' }),
    questionImg: z
      .instanceof(File)
      .refine(file => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        file => file && ACCEPTED_IMAGE_TYPES.includes(file.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      )
      .optional(),
    answerImg: z
      .instanceof(File)
      .refine(file => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        file => file && ACCEPTED_IMAGE_TYPES.includes(file.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      )
      .optional(),
  })

  type UpdateCardFormData = z.infer<typeof schema>
  const [updateCard] = useUpdateCardMutation()
  const { control, handleSubmit, resetField } = useForm<UpdateCardFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      question: card.question,
      answer: card.answer,
      questionImg: undefined,
      answerImg: undefined,
    },
  })

  const onSubmit = handleSubmit((data: UpdateCardFormData) => {
    {
      const imgData = new FormData()

      imgData.append('answer', data.answer)
      imgData.append('question', data.question)
      imgData.append('questionImg', data.questionImg ?? '')
      imgData.append('answerImg', data.questionImg ?? '')

      updateCard({ data: imgData, id: card.id })
      setShowModal(false)
    }
  })

  const deleteImg = (name: 'questionImg' | 'answerImg') => {
    if (name === 'questionImg') {
      resetField(name)
    } else {
      resetField(name)
    }
  }

  return (
    <form onSubmit={onSubmit} className={s.form}>
      <ControlledInput
        control={control}
        name="question"
        type={'text'}
        id="create-card-question"
        placeholder="Question"
        label="Question"
      />
      <div style={{ textAlign: 'center' }}>
        <ControlledInput
          resetImg={() => deleteImg('questionImg')}
          img={card.questionImg}
          control={control}
          name="questionImg"
          type="file"
          id="create-card-question-img"
          style={{ display: 'none' }}
        />
        <Button
          as={'label'}
          variant="secondary"
          fullWidth
          htmlFor="create-card-question-img"
          className={s.fileButton}
        >
          <SvgImgIcon />
          {card.questionImg ? 'Change Cover' : 'Add Cover'}
        </Button>
      </div>
      <ControlledInput
        control={control}
        name="answer"
        type={'text'}
        id="create-card-answer"
        placeholder="Answer"
        label="Answer"
      />
      <div style={{ textAlign: 'center' }}>
        <ControlledInput
          resetImg={() => deleteImg('answerImg')}
          img={card.answerImg}
          control={control}
          name="answerImg"
          type="file"
          id="create-card-answer-img"
          style={{ display: 'none' }}
        />
        <Button
          as={'label'}
          variant="secondary"
          fullWidth
          htmlFor="create-card-answer-img"
          className={s.fileButton}
        >
          <SvgImgIcon /> {card.answerImg ? 'Change Cover' : 'Add Cover'}
        </Button>
      </div>
      <div className={s.modalButton}>
        <Button variant="secondary">Cancel</Button>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  )
}
