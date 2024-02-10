import { Meta } from '@storybook/react'

import { SvgDelete, SvgEdit, SvgPlay } from '../../../assets/icons/menu-icons'
import { Typography } from '../typography'

import s from './table.module.scss'

import { Table } from './'

import { Button } from '@/components/ui/button'

export default {
  title: 'Components/Table',
  component: Table.Root,
  tags: ['autodocs'],
} as Meta<typeof Table.Root>

export const Default = {
  args: {
    children: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell align="center">Cards</Table.HeaderCell>
            <Table.HeaderCell>Last Updated</Table.HeaderCell>
            <Table.HeaderCell>Creat by</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>React</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>18.03.2023</Table.Cell>
            <Table.Cell>
              <Typography
                as={'a'}
                variant={'link1'}
                href="https://it-incubator.io/"
                target="_blank"
              >
                it-incubator
              </Typography>
            </Table.Cell>
            <Table.Cell>
              <div className={s.buttonContainer}>
                <Button variant="link" className={s.editAvatarButton}>
                  <SvgPlay />
                </Button>
                <Button variant="link" className={s.editAvatarButton}>
                  <SvgEdit />
                </Button>
                <Button variant="link" className={s.editAvatarButton}>
                  <SvgDelete />
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Java Script</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>12.03.2023</Table.Cell>
            <Table.Cell>it-incubator</Table.Cell>
            <Table.Cell>
              <div className={s.buttonContainer}>
                <Button variant="link">
                  <SvgPlay />
                </Button>
                <Button variant="link">
                  <SvgEdit />
                </Button>
                <Button variant="link">
                  <SvgDelete />
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </>
    ),
  },
}
