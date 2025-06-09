export type TextPropsElement =
  | 'dt'
  | 'dd'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'strong'
  | 'legend'

export type HeadingElement = Extract<TextPropsElement, 'h1' | 'h2' | 'h3' | 'h4' | 'h5'>

export type TextPropsVariant =
  | 'display'
  | 'heading2xl'
  | 'headingXl'
  | 'headingLg'
  | 'headingMd'
  | 'headingSm'
  | 'bodyLg'
  | 'bodyMd'
  | 'bodySm'
  | 'caption'

export type HeadingVariant = Extract<
  TextPropsVariant,
  'heading2xl' | 'headingXl' | 'headingLg' | 'headingMd' | 'headingSm'
>

export type TextPropsTone =
  | 'accent'
  | 'critical'
  | 'caution'
  | 'success'
  | 'muted'
  | 'subtle'
  | 'content'
  | 'other'

export type TextPropsAlignment = 'start' | 'center' | 'end' | 'justify'
export type TextPropsWeight = 'normal' | 'medium' | 'bold'
export type TextPropsTracking = 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest'
export type TextPropsDecoration = 'line-through' | 'underline'

export interface TextProps {
  alignment?: TextPropsAlignment
  as: TextPropsElement
  breakWord?: boolean
  tone?: TextPropsTone
  tracking?: TextPropsTracking
  truncate?: boolean
  uppercase?: boolean
  variant?: TextPropsVariant
  textDecoration?: TextPropsDecoration
  weight?: TextPropsWeight
}
