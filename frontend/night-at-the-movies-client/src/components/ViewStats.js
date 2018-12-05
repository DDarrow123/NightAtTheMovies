import React from 'react';
import {
  Table, TableBody, TableCell, TableFooter, TableHeader, TableRow,
  Text, Button
} from 'grommet';

const BASE = 'http://localhost:4000/api/v1/'
const USER_URL = BASE+'users'

const COLUMNS = [
  {
    property: 'date',
    label: 'Date',
    dataScope: 'row',
    format: datum => <strong>{datum.date}</strong>,
  },
  {
    property: 'time_taken',
    label: 'Time',
  },
  {
    property: 'points',
    label: 'Points',
  },
  {
    property: 'ticket',
    label: 'Free Ticket?',
    align: 'end',
  },
];

class ViewStats extends React.Component {
  state = {
    games: []
  }

  componentDidMount() {
    fetch(`${USER_URL}/${this.props.user.id}`).then(r=>r.json()).then(games => this.setState({games: games}))
  }

  resetStats = () => {
    fetch(`${USER_URL}/${this.props.user.id}`, {
      method: 'DELETE'
    }).then(r => r.ok ? this.setState({games: []}) : null)
  }

  displayStats = () => {
    if (this.state.games.length > 0) {
      return (
        <div style={{textAlign: '-webkit-center'}}>
        <h1>{this.props.user.name}'s Game History</h1>
        <Table caption='Simple Table'>
        <TableHeader>
        <TableRow>
        {COLUMNS.map(c => (
          <TableCell key={c.property} scope='col' border='bottom' align={c.align}>
          <Text>{c.label}</Text>
          </TableCell>
        ))}
        </TableRow>
        </TableHeader>
        <TableBody>
        {this.state.games.map(datum => (
          <TableRow key={datum.id}>
          {COLUMNS.map(c => (
            <TableCell key={c.property} scope={c.dataScope} align={c.align}>
            <Text>
            {c.format ? c.format(datum) : datum[c.property]}
            </Text>
            </TableCell>
          ))}
          </TableRow>
        ))}
        </TableBody>
        </Table>
        <Button label="Reset Stats" onClick={this.resetStats}/>
        </div>
      )
    } else {
      return <h1>Go Play!</h1>
    }
  }

  render() {
    return(
      <React.Fragment>
      {this.displayStats()}
      </React.Fragment>
    )
  }
}

export default ViewStats;
