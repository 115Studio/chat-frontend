export type ButtonPropsVariant = 'inner' | 'accent'

export type ButtonPropsSize = 'sm' | 'md' | 'lg' | 'sq'

export type ButtonPropsType = 'button' | 'submit' | 'reset'

export type ButtonPropsAlignment = 'start' | 'center' | 'end' | 'stretch'

export type ButtonPropsWeight = 'normal' | 'medium' | 'bold'

export interface ButtonProps {
  variant?: ButtonPropsVariant
  size?: ButtonPropsSize
  type?: ButtonPropsType
  alignment?: ButtonPropsAlignment
  weight?: ButtonPropsWeight
  disabled?: boolean
  loading?: boolean
  skeleton?: boolean
  fullWidth?: boolean
  class?: string
}
