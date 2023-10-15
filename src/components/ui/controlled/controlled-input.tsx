import { ChangeEvent, useState } from 'react'

import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { Deck } from '../../../services/decks/types'
import { Input, InputProps } from '../input'

export type ControlledInputProps<TInputValues extends FieldValues> = {
  name: FieldPath<TInputValues>
  control: Control<TInputValues>
  id: string
  deck?: Deck
  img?: string
  resetImg?: () => void
} & Omit<InputProps, 'onChange' | 'value' | 'id'>

export const ControlledInput = <TInputValues extends FieldValues>(
  props: ControlledInputProps<TInputValues>
) => {
  const { resetImg, ...rest } = props
  const {
    field: { value, onChange, name, onBlur, ref },
    fieldState: { error },
  } = useController({
    name: props.name,
    control: props.control,
  })
  const [img, setImg] = useState<string | null>(props.deck?.cover || props.img || null)
  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.type === 'file' && e.target.files) {
      onChange(e.target.files[0])
      setImg(URL.createObjectURL(e.target.files[0]))
    } else {
      onChange(e.currentTarget.value)
    }
  }
  const isImg = props.type === 'file'

  const resetField = () => {
    setImg(null)
    props.resetImg?.()
  }

  return (
    <>
      {isImg && (
        <div>
          <img src={img ? img : undefined} style={{ maxWidth: '484px', maxHeight: '120px' }} />
          {img && <span onClick={resetField}>&#215;</span>}
        </div>
      )}
      <Input
        {...rest}
        value={isImg ? value?.fileName : value}
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
