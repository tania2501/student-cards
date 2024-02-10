import { SvgFillStar, SvgNoneFillStar } from '../../../assets/icons/grade'

export type RatingPropsType = {
  value: number
}
export const Rating = (props: RatingPropsType) => {
  return (
    <div>
      <Star selected={props.value > 0} />
      <Star selected={props.value > 1} />
      <Star selected={props.value > 2} />
      <Star selected={props.value > 3} />
      <Star selected={props.value > 4} />
    </div>
  )
}

type StarPropsType = {
  selected: boolean
}

const Star = (props: StarPropsType) => {
  return <span>{props.selected ? <SvgFillStar /> : <SvgNoneFillStar />}</span>
}
