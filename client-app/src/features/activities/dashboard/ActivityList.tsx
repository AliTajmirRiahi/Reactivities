import React from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
}

const ActivityList: React.FC<IProps> = ({
  activities,
  selectActivity,
  deleteActivity
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map(ac => (
          <Item key={ac.id}>
            <Item.Content>
              <Item.Header as='a'>{ac.title}</Item.Header>
              <Item.Meta>{ac.date}</Item.Meta>
              <Item.Description>
                <div>{ac.description}</div>
                <div>
                  {ac.city},{ac.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectActivity(ac.id)}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  onClick={() => deleteActivity(ac.id)}
                  floated='right'
                  content='Delete'
                  color='red'
                />
                <Label basic content={ac.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default ActivityList;
