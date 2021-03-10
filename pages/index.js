import Head from 'next/head';
import TaskList from '../components/TaskList';

const Home = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    height: '100vh'
  }}>
    <TaskList />
  </div>
);

export default Home;