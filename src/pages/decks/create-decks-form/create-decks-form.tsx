import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { SvgImgIcon } from '../../../assets/icons/img-icon'
import { Button } from '../../../components/ui/button'
import { ControlledCheckbox } from '../../../components/ui/controlled/controlled-checkbox/controlled-checkbox'
import { ControlledInput } from '../../../components/ui/controlled/controlled-checkbox/controlled-input'
import { useCreateDecksMutation } from '../../../services/decks/decks.service'
import s from '../decks.module.scss'

type ModalType = {
  setShowModal: (show: boolean) => void
}

export const CreateDecksForm: FC<ModalType> = ({ setShowModal }) => {
  const MAX_FILE_SIZE = 500000
  const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  const schema = z.object({
    name: z.string().min(3, { message: 'Must be exactly 3 characters long' }),
    isPrivate: z.boolean().default(false),
    cover: z
      .instanceof(File)
      .refine(file => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        file => file && ACCEPTED_IMAGE_TYPES.includes(file.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      )
      .optional(),
  })

  type CreateDeckFormData = z.infer<typeof schema>

  const { control, handleSubmit } = useForm<CreateDeckFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      isPrivate: false,
      cover: undefined,
    },
  })
  const [createDeck] = useCreateDecksMutation()
  const onChange = handleSubmit((data: CreateDeckFormData) => {
    const imgFile = new FormData()

    data.cover && imgFile.append('cover', data.cover)
    imgFile.append('name', data.name)
    imgFile.append('isPrivate', JSON.stringify(data.isPrivate))

    createDeck(imgFile)
    setShowModal(false)
  })

  return (
    <form onSubmit={onChange} className={s.form}>
      <div>
        <ControlledInput
          control={control}
          name="cover"
          type="file"
          id="file-cover"
          style={{ display: 'none' }}
        />
        <Button
          as={'label'}
          variant="secondary"
          fullWidth
          htmlFor="file-cover"
          className={s.fileButton}
        >
          <SvgImgIcon /> Add Cover Image
        </Button>
      </div>
      <ControlledInput
        control={control}
        name="name"
        id="packs-name"
        label="Name pack"
        placeholder="Name"
      />
      <ControlledCheckbox label="Private pack" name="isPrivate" control={control} />
      <div className={s.modalButton}>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Add New Pack
        </Button>
      </div>
    </form>
  )
}
