import './App.scss'
import { AutocompleteInput } from './components/molecules/AutocompleteInput/AutocompleteInput'
import { ResultsList } from './components/organisms/ResultsList/ResultsList'

function App() {
  return (
    <div className="app">
      <h1>Search Your Product</h1>
      <AutocompleteInput />
      <ResultsList />
    </div>
  )
}

export default App