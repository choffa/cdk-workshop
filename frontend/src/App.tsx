import * as React from 'react';
import Layout from './layout/Layout';
import TaskList from './components/TaskList';


export default function App() {
  console.log(process.env.REACT_APP_API_URL)
  return (
    <Layout>
      <TaskList />
    </Layout>
  );
}
