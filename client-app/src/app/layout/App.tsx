import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import { IActivity } from '../models/activity';
import AvtivityDashboard from '../../features/activities/dashboard/AvtivityDashboard';
import agent from '../api/agent';
import Loading from './Loading';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectActivity(activities.filter((ac) => ac.id === id)[0]);
    setEditMode(false);
  };
  const handleNewActivity = () => {
    setSelectActivity(null);
    setEditMode(true);
  };

  useEffect(() => {
    getActivities();
  }, []);

  const getActivities = async () => {
    agent.Activities.list()
      .then((response) => {
        let activities: IActivity[] = [];
        response.forEach((ac: any) => {
          ac.date = ac.date.split('.')[0];
          activities.push(ac);
        });
        setActivities(activities);
      })
      .then(() => setLoading(false));
  };

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };
  const handleEditActivity = (activity: IActivity) => {
    agent.Activities.update(activity).then(() => {
      setActivities(
        activities.map((ac) => (ac.id === activity.id ? activity : ac))
      );
      setSelectActivity(activity);
      setEditMode(false);
    });
  };

  const handleDeleteActivity = (id: string) => {
    agent.Activities.delete(id).then(() => {
      setActivities(activities.filter((ac) => ac.id !== id));
    });
  };

  if (loading && activities === null) return <Loading content='Loading ...' />;
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
