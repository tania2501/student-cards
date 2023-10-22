import { useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import { Button } from '../../../components/ui/button'
import { Card } from '../../../components/ui/card'
import { CardsRadioGroup, Option } from '../../../components/ui/radio-group'
import { Typography } from '../../../components/ui/typography'
import { useGetCardsByIdQuery, useGetDecksByIdQuery } from '../../../services/decks/decks.service'
import s from '../cards.module.scss'

export const LearnCard = () => {
  const [showAnswer, setShowAnswer] = useState(false)
  const { cardId } = useParams<{ cardId: string }>()
  const { data: card } = useGetCardsByIdQuery({
    id: cardId || '',
  })
  const deckId = card?.deckId
  const { data: deck } = useGetDecksByIdQuery({
    id: deckId || '',
  })
  const option: Option[] = [
    { value: '1', label: 'Did not know' },
    { value: '2', label: 'Forgot' },
    { value: '3', label: 'A lot of though' },
    { value: '4', label: 'Confused' },
    { value: '5', label: 'Knew the answer' },
  ]

  return (
    <>
      <Typography as={Link} to={`/deck/${deckId}`} variant="body2" className={s.linkButton}>
        &#8592; Back to pack
      </Typography>
      <Card>
        <Typography variant="large">Learn &quot;{deck?.name}&quot;</Typography>
        <div className={s.question}>
          <Typography as="span" variant="h3" style={{ marginRight: '5px' }}>
            Question:
          </Typography>
          <Typography as="span" variant="body1">
            {card?.question}
          </Typography>
          <Typography variant="caption" className={s.shots}>
            Количество попыток ответов на вопрос: {card?.shots}
          </Typography>
        </div>
        {showAnswer ? (
          <div className={s.question}>
            <Typography as="span" variant="h3" style={{ marginRight: '5px' }}>
              Answer:
            </Typography>
            <Typography as="span" variant="body1">
              {card?.answer}
            </Typography>
            <div>
              <Typography variant="h3" className={s.rate}>
                Rate yourself:{' '}
              </Typography>
              <CardsRadioGroup options={option} defaultValue={option[0].label} />
            </div>
            <Button
              variant="primary"
              onClick={() => setShowAnswer(false)}
              style={{ marginTop: '22px' }}
              fullWidth
            >
              Next question
            </Button>
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
