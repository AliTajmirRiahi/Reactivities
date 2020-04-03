import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import NavBar from '../../features/nav/NavBar';
import { IActivity } from '../models/activity';
import AvtivityDashboard from '../../features/activities/dashboard/AvtivityDashboard';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectActivity(activities.filter(ac => ac.id === id)[0]);
    setEditMode(false);
  };
  const handleNewActivity = () => {
    setSelectActivity({
      id: '',
      title: '',
      description: '',
      category: '',
      date: '',
      city: '',
      venue: ''
    });
    setEditMode(true);
  };

  useEffect(() => {
    getActivities();
  }, []);

  const getActivities = async () => {
    const res = await axios.get<IActivity[]>('/api/activities');
    let activities = res.data;
    activities.forEach(ac => {
      ac.date = ac.date.split('.')[0];
    });
    setActivities(activities);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectActivity(activity);
    setEditMode(false);
  };
  const handleEditActivity = (activity: IActivity) => {
    setActivities(
      activities.map(ac => (ac.id === activity.id ? activity : ac))
    );
    setSelectActivity(activity);
    setEditMode(false);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter(ac => ac.id !== id));
  };

  if (activities === null) return <Fragment></Fragment>;
  return (
    <Fragment>
      <NavBar newActivity={handleNewActivity} />
      <Container style={{ marginTop: '7em' }}>
        <AvtivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectActivity={setSelectActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;
