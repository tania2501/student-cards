import { ChangeEvent, useState } from 'react'

import { Link } from 'react-router-dom'

import { SvgEdit, SvgOut } from '../../assets/icons/menu-icons'
import { Avatar } from '../../components/ui/avatar'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Typography } from '../../components/ui/typography'
import {
  useChangeNameMutation,
  useGetMeQuery,
  useLogOutMutation,
} from '../../services/auth/auth.service'

import s from './profile.module.scss'

import ava from '@/assets/logo.jpg'

export const Profile = () => {
  const { data } = useGetMeQuery()
  const [logout] = useLogOutMutation()
  const [info] = useChangeNameMutation()
  const [editName, setEditName] = useState(false)
  const [name, setName] = useState<string>(data?.name || '')

  const changeName = () => {
    const form = new FormData()

    form.append('name', name)

    info(form)
    setEditName(false)
  }

  const onChangePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files as FileList

    if (selectedFiles) {
      const formData = new FormData()

      formData.append('avatar', selectedFiles[0])

      info(formData)
    }
  }
  const handleLogout = () => {
    logout()
  }

  return (
    <Card>
      <Typography variant={'large'}>Personal Information</Typography>
      <div className={s.avatar}>
        <Avatar src={data?.avatar ?? ava} style={{ margin: '25px 0' }} size={96} />
        <div className={s.icon}>
          <label htmlFor="file-input">
            <SvgEdit />
          </label>
          <input id="file-input" type="file" onChange={onChangePhoto} style={{ display: 'none' }} />
        </div>
      </div>
      {editName ? (
        <div>
          <Input value={name} onChange={e => setName(e.currentTarget.value)} />
          <Button variant="primary" onClick={changeName} fullWidth className={s.saveChanges}>
            Save Changes
          </Button>
        </div>
      ) : (
        <div>
          <div className={s.name}>
            <Typography variant={'h1'}>{name}</Typography>
            <SvgEdit onClick={() => setEditName(true)} />
          </div>
          <Typography variant={'body2'} style={{ margin: '13px 0', color: '#808080' }}>
            {data?.email}
          </Typography>
          <Button variant="secondary" onClick={handleLogout}>
            <SvgOut /> Logout
          </Button>
          <Button as={Link} to={'/decks'} variant="link" className={s.linkButton} fullWidth>
            Back to Packs List &#8594;
          </Button>
        </div>
      )}
    </Card>
  )
}
