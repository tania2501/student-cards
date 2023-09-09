import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { Input, InputProps } from '../../input'

export type ControlledInputProps<TInputValues extends FieldValues> = {
  name: FieldPath<TInputValues>
  control: Control<TInputValues>
} & Omit<InputProps, 'onChange' | 'value' | 'id'>

export const ControlledInput = <TInputValues extends FieldValues>(
  props: ControlledInputProps<TInputValues>
) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: props.name,
    control: props.control,
  })

  return <Input {...props} {...field} errorMessage={error?.message} id={props.name} />
}
