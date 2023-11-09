import { useState } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '../../../components/ui/button'
import { Card } from '../../../components/ui/card'
import { ControlledRadioGroup } from '../../../components/ui/controlled/controlled-radio-group'
import { Option } from '../../../components/ui/radio-group'
import { Typography } from '../../../components/ui/typography'
import { deckSlice } from '../../../services/decks/deck.slice'
import {
  useGetDecksByIdQuery,
  useLearnDeckQuery,
  useSaveGradeOfCardMutation,
} from '../../../services/decks/decks.service'
import { useAppDispatch, useAppSelector } from '../../../services/store'
import s from '../cards.module.scss'

export const LearnCard = () => {
  const [showAnswer, setShowAnswer] = useState(false)
  const { deckId } = useParams<{ deckId: string }>()
  const cardId = useAppSelector(state => state.deckSlice.cardId)
  const dispatch = useAppDispatch()
  const setCardId = (id: string) => dispatch(deckSlice.actions.setCardId(id))
  const { data: deck } = useGetDecksByIdQuery({
    id: deckId || '',
  })
  const [saveGrade] = useSaveGradeOfCardMutation()
  const { data: learnDeck } = useLearnDeckQuery({
    id: deckId || '',
    previousCardId: cardId,
  })

  const navigate = useNavigate()
  const option: Option[] = [
    { value: '1', label: 'Did not know' },
    { value: '2', label: 'Forgot' },
    { value: '3', label: 'A lot of though' },
    { value: '4', label: 'Confused' },
    { value: '5', label: 'Knew the answer' },
  ]

  const schema = z.object({
    radio: z.union([z.enum(['1', '2', '3', '4', '5']), z.null()]).nullable(),
  })

  const { control, handleSubmit } = useForm<{ radio: string }>({
    resolver: zodResolver(schema),
    defaultValues: {
      radio: '1',
    },
  })

  const onSubmit = handleSubmit((data: { radio: string }) => {
    saveGrade({ cardId: cardId, grade: +data.radio, id: deckId! })
      .unwrap()
      .then(() => {
        setCardId(learnDeck?.id!)
        navigate(`/cards/learn/${deckId}`)
      })
  })

  return (
    <>
      <Typography as={Link} to={`/cards/${deckId}`} variant="body2" className={s.linkButton}>
        &#8592; Back to pack
      </Typography>
      <Card>
        <Typography variant="large">Learn &quot;{deck?.name}&quot;</Typography>
        <div className={s.question}>
          <Typography as="span" variant="h3" style={{ marginRight: '5px' }}>
            Question:
          </Typography>
          <Typography as="span" variant="body1">
            {learnDeck?.question}
          </Typography>
          <Typography variant="caption" className={s.shots}>
            Количество попыток ответов на вопрос: {learnDeck?.shots}
          </Typography>
        </div>
        {showAnswer ? (
          <div className={s.question}>
            <Typography as="span" variant="h3" style={{ marginRight: '5px' }}>
              Answer:
            </Typography>
            <Typography as="span" variant="body1">
              {learnDeck?.answer}
            </Typography>
            <form onSubmit={onSubmit}>
              <DevTool control={control} />
              <div>
                <Typography variant="h3" className={s.rate}>
                  Rate yourself:{' '}
                </Typography>
                <ControlledRadioGroup
                  control={control}
                  name="radio"
                  options={option}
                  defaultValue={option[0].value}
                />
              </div>
              <Button type="submit" variant="primary" style={{ marginTop: '22px' }} fullWidth>
                Next question
              </Button>
            </form>
          </div>
        ) : (
          <Button variant="primary" onClick={() => setShowAnswer(true)} fullWidth>
            Show answer
          </Button>
        )}
      </Card>
    </>
  )
}
