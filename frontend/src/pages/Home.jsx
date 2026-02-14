import TranscriptInput from '../components/TranscriptInput'
import Header from '../components/Header'
import ActionItemList from '../components/ActionItemList'
import RecentTranscripts from '../components/RecentTranscripts'

const Home = () => {
  return (
    <>
    <Header/>
    <TranscriptInput/>
    <ActionItemList/>
    <RecentTranscripts/>
    </>
  )
}

export default Home