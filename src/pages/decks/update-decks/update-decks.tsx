import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { SvgImgIcon } from '../../../assets/icons/img-icon'
import { Button } from '../../../components/ui/button'
import { ControlledCheckbox } from '../../../components/ui/controlled/controlled-checkbox/controlled-checkbox'
import { ControlledInput } from '../../../components/ui/controlled/controlled-checkbox/controlled-input'
import { useUpdateDecksMutation } from '../../../services/decks/decks.service'
import { Deck } from '../../../services/decks/types'
import s from '../decks.module.scss'

type EditDecksType = {
  setShowModal: (show: boolean) => void
  deck: Deck
}

export const UpdateDecks: FC<EditDecksType> = ({ setShowModal, deck }) => {
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

  type UpdateDeckFormData = z.infer<typeof schema>
  const [updateDeck] = useUpdateDecksMutation()
  const { control, handleSubmit } = useForm<UpdateDeckFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      name: deck.name,
      isPrivate: deck.isPrivate,
      cover: undefined,
    },
  })

  const onChange = handleSubmit((data: UpdateDeckFormData) => {
    {
      const imgFile = new FormData()

      data.cover && imgFile.append('cover', data.cover)
      imgFile.append('name', data.name)
      imgFile.append('isPrivate', JSON.stringify(data.isPrivate))

      updateDeck({ data: imgFile, id: deck.id })
      setShowModal(false)
    }
  })

  return (
    <form onSubmit={onChange} className={s.form}>
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <ControlledInput
          deck={deck}
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
          Save Changes
        </Button>
      </div>
    </form>
  )
}
