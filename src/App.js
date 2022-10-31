import './App.scss';
import TitleId from './components/titleId/TitleId';
import AdviceText from './components/adviceText/AdviceText';
import Diveder from './components/diveder/Diveder';
import ButtonDice from './components/buttonDice/ButtonDice';
import { useEffect, useState } from 'react';
import Loading from './components/loading/Loading';
import ErrorMessage from './components/errorMessage/ErrorMessage';

function App() {
  const [adviceText, setAdviceText] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      try {
        const reponse = await fetch('https://api.adviceslip.com/advice');
        const responseJson = await reponse.json();
        setAdviceText(responseJson.slip)
        setError('')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [])

  const handleClicked = async () => {
    setLoading(true)
    try {
      const reponse = await fetch('https://api.adviceslip.com/advice');
      const responseJson = await reponse.json();
      setAdviceText(responseJson.slip)
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="App">
      <div className='card-advice'>
        {error ? '' : loading ? '' : <TitleId id={adviceText.id} />}
        {error ? <ErrorMessage /> : loading ? <Loading /> : <AdviceText text={adviceText.advice} />}
        <Diveder />
        <ButtonDice handleClicked={handleClicked} />
      </div>
    </main>
  );
}

export default App;
