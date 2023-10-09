import { ChangeEvent, useState } from 'react'

import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { Deck } from '../../../../services/decks/types'
import { Input, InputProps } from '../../input'

import icon from '@/assets/icons/8f77a51611a552cfd42b1ec2f4c1e4c6.png'

export type ControlledInputProps<TInputValues extends FieldValues> = {
  name: FieldPath<TInputValues>
  control: Control<TInputValues>
  id: string
  deck?: Deck
} & Omit<InputProps, 'onChange' | 'value' | 'id'>

export const ControlledInput = <TInputValues extends FieldValues>(
  props: ControlledInputProps<TInputValues>
) => {
  const {
    field: { value, onChange, name, onBlur, ref },
    fieldState: { error },
  } = useController({
    name: props.name,
    control: props.control,
  })
  const [img, setImg] = useState<string | null>(props.deck?.cover || null)
  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.id === 'file-cover' && e.target.files) {
      onChange(e.target.files[0])
      setImg(URL.createObjectURL(e.target.files[0]))
    } else {
      onChange(e.currentTarget.value)
    }
  }
  const isImg = props.id === 'file-cover'

  return (
    <>
      {isImg && <img src={img ? img : icon} style={{ maxWidth: '484px', maxHeight: '120px' }} />}
      <Input
        {...props}
        value={props.id === 'file-cover' ? value?.fileName : value}
        onChange={onChangeValue}
        name={name}
        onBlur={onBlur}
        errorMessage={error?.message}
        id={props.id}
        ref={ref}
      />
    </>
  )
}
