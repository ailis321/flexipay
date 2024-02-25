
import Tagline from '../components/Tagline';
import FeatureSections from '../components/FeatureSections'; 
import FAQSection from '../components/FAQSection';


const Home = () => {
  return (
    <div className="Home">
      <Tagline />
      <FeatureSections /> {/* Include the FeatureSections component */}
      <FAQSection /> {/* Include the FAQSection component */}
    </div>
  );
};

export default Home;
