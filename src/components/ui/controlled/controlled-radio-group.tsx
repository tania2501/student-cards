import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { CardsRadioGroup, RadioGroupProps } from '@/components/ui/radio-group'

export type ControlledRadioGroupProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>
  control: Control<TFieldValues>
} & Omit<RadioGroupProps, 'onChange' | 'value' | 'id'>

export const ControlledRadioGroup = <TFieldValues extends FieldValues>(
  props: ControlledRadioGroupProps<TFieldValues>
) => {
  const {
    field: { value, onChange, ...field },
    fieldState: { error },
  } = useController({
    name: props.name,
    control: props.control,
  })

  return (
    <CardsRadioGroup
      {...props}
      {...field}
      value={value}
      onChange={onChange}
      onValueChange={onChange}
      errorMessage={error?.message}
      id={props.name}
    />
  )
}
