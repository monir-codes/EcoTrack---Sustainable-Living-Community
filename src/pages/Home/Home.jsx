import ActiveChallenges from '../../Components/ActiveChallenges/ActiveChallenges';
import Hero from '../../Components/Hero/Hero';
import RecentTips from '../../Components/RecentTips/RecentTips';
import StaticInfo from '../../Components/StaticInfo/StaticInfo';
import StatsSection from '../../Components/StatsSection/StatsSection';
import UpcomingEvents from '../../Components/UpcomingEvents/UpcomingEvents';

const Home = () => {
    return (
      <>
      <Hero></Hero>
      <StatsSection></StatsSection>
      <StaticInfo></StaticInfo>
      <ActiveChallenges></ActiveChallenges>
      <RecentTips></RecentTips>
      <UpcomingEvents></UpcomingEvents>
      </>
    );
};

export default Home;