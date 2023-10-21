import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { SvgImgIcon } from '../../../assets/icons/img-icon'
import { Button } from '../../../components/ui/button'
import { ControlledInput } from '../../../components/ui/controlled/controlled-input'
import { MainSelect } from '../../../components/ui/select'
import { Typography } from '../../../components/ui/typography'
import { useCreateCardMutation } from '../../../services/decks/decks.service'
import s from '../cards.module.scss'

export const CreateCard = (props: { id: string; setShow: (show: boolean) => void }) => {
  const MAX_FILE_SIZE = 500000
  const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  const [itemType, setItemType] = useState('Text')
  const [createCard] = useCreateCardMutation()
  const schemaText = z.object({
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

  type CreateCardText = z.infer<typeof schemaText>

  const { control, handleSubmit } = useForm<CreateCardText>({
    mode: 'onSubmit',
    resolver: zodResolver(schemaText),
    defaultValues: {
      question: '',
      answer: '',
      questionImg: undefined,
      answerImg: undefined,
    },
  })

  const onSubmitImg = handleSubmit((data: CreateCardText) => {
    const imgData = new FormData()

    imgData.append('answer', data.answer)
    imgData.append('question', data.question)
    data.questionImg && imgData.append('questionImg', data.questionImg)
    data.answerImg && imgData.append('answerImg', data.answerImg)

    createCard({ data: imgData, id: props.id })
    props.setShow(false)
  })

  const dataType = itemType === 'Text'

  return (
    <div>
      <form onSubmit={onSubmitImg} className={s.form}>
        <div>
          <Typography as="label" variant="body2" className={s.label}>
            Choose a question format
          </Typography>
          <MainSelect
            value={['Text', 'Image']}
            defaultValue={'Text'}
            onChange={setItemType}
            style={{ backgroundColor: 'transparent', width: '97%', zIndex: '999' }}
          />
        </div>

        <ControlledInput
          control={control}
          name="question"
          type={'text'}
          id="create-card-question"
          placeholder="Question"
          label="Question"
        />
        {!dataType && (
          <div style={{ textAlign: 'center' }}>
            <ControlledInput
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
              <SvgImgIcon /> Add Cover
            </Button>
          </div>
        )}
        <ControlledInput
          control={control}
          name="answer"
          type={'text'}
          id="create-card-answer"
          placeholder="Answer"
          label="Answer"
        />
        {!dataType && (
          <div style={{ textAlign: 'center' }}>
            <ControlledInput
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
              <SvgImgIcon /> Add Cover
            </Button>
          </div>
        )}
        <div className={s.modalButton}>
          <Button variant="secondary">Cancel</Button>
          <Button type="submit">Add New card</Button>
        </div>
      </form>
    </div>
  )
}
