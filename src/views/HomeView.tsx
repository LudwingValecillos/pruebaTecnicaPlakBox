import MaterialList from '../components/MaterialList'
import PiecesList from '../components/PiecesList'
import TodoList from '../components/TodoList'
import './HomeView.css'

const HomeView = () => {
  return (
    <div className="container">
      <TodoList />
      <div style={{ marginTop: '10px' }} />
      <main className="home-grid">
        <MaterialList />
        <PiecesList />
      </main>
    </div>
  )
}

export default HomeView 