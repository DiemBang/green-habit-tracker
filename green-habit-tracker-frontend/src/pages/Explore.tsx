import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import utensilHero from "../assets/challenge-icons/utensil-hero.png";
import noMorePlasticBagsIcon from "../assets/challenge-icons/no-plasticbags.png";
import paperSaverIcon from "../assets/challenge-icons/paper-saver.png";
import clothChampionIcon from "../assets/challenge-icons/cloth-champion.png";
import plantSipperIcon from "../assets/challenge-icons/plant-sipper.png";
import eWasteHeroIcon from "../assets/challenge-icons/ewaste-hero.png";
import showerSaverIcon from "../assets/challenge-icons/shower-saver.png";
import compostStarterIcon from "../assets/challenge-icons/compost-starter.png";
import meatfreeWeekIcon from "../assets/challenge-icons/meatfree-week.png";
import coffeeRecyclerIcon from "../assets/challenge-icons/coffee-recycler.png";
import dairyfreeWeekIcon from "../assets/challenge-icons/dairyfree-week.png";
import teabagBanIcon from "../assets/challenge-icons/teabag-ban.png";
import farmToTableIcon from "../assets/challenge-icons/farm-to-table-champion.png";
import ecoChefIcon from "../assets/challenge-icons/eco-chef.png";
import powerDownProIcon from "../assets/challenge-icons/powerdown-pro.png";
import lightsoffHourIcon from "../assets/challenge-icons/lightsoff-hour.png";
import lightsSaverIcon from "../assets/challenge-icons/lights-saver.png";
import pedalPowerIcon from "../assets/challenge-icons/pedal-power.png";
import streamingCutbackIcon from "../assets/challenge-icons/streaming-cutback.png";
import errandRunChampionIcon from "../assets/challenge-icons/errand-run-champion.png";
import noCarChallengeIcon from "../assets/challenge-icons/no-car.png";
import transitSwapIcon from "../assets/challenge-icons/transit-swap.png";
import furnitureRefreshIcon from "../assets/challenge-icons/furniture-refresh.png";
import applianceRecyclerIcon from "../assets/challenge-icons/appliance-recycler.png";
import emailEfficiencyIcon from "../assets/challenge-icons/email-efficiency.png";
import declutterDriveIcon from "../assets/challenge-icons/declutter-drive.png";
import laundryWaterSaverIcon from "../assets/challenge-icons/laundry-water-saver.png";
import bookGiverIcon from "../assets/challenge-icons/book-giver.png";
import { IChallenge } from "../models/IChallenge";
import { CardSection } from "../components/CardSection";
import ecoIcon from "/src/assets/ecotip-icon.svg";
import challengeIcon from "/src/assets/planet.svg";

export const Explore = () => {
  type StringDictionary = { [key: string]: string };

  const challengeIcons: StringDictionary = {
    "Utensil Hero": utensilHero,
    "No More Plastic Bags": noMorePlasticBagsIcon,
    "Paper Saver": paperSaverIcon,
    "Cloth Champion": clothChampionIcon,
    "E-Waste Hero": eWasteHeroIcon,
    "Shower Saver": showerSaverIcon,
    "Compost Starter": compostStarterIcon,
    "Meat-Free Week": meatfreeWeekIcon,
    "Coffee Recycler": coffeeRecyclerIcon,
    "Dairy-Free Week": dairyfreeWeekIcon,
    "Tea Bag Ban": teabagBanIcon,
    "Farm-to-Table Champion": farmToTableIcon,
    "Eco Chef": ecoChefIcon,
    "Power Down Pro": powerDownProIcon,
    "Lights Off Hour": lightsoffHourIcon,
    "Light Saver": lightsSaverIcon,
    "Pedal Power": pedalPowerIcon,
    "Streaming Cutback": streamingCutbackIcon,
    "Plant Sipper": plantSipperIcon,
    "Errand Run Champion": errandRunChampionIcon,
    "No-Car Challenge": noCarChallengeIcon,
    "Transit Swap": transitSwapIcon,
    "Furniture Refresh": furnitureRefreshIcon,
    "Appliance Recycler": applianceRecyclerIcon,
    "Email Efficiency": emailEfficiencyIcon,
    "Declutter Drive": declutterDriveIcon,
    "Laundry Water Saver": laundryWaterSaverIcon,
    "Book Giver": bookGiverIcon,
  };

  const { challenges, ecotip } = useLoaderData();

  return (
    <>
      <h2 className="flex items-center">Explore what's on</h2>
      <h3>
        <img
          src={challengeIcon}
          alt="Challenge Icon"
          className="w-5 h-5 mr-2 inline-block"
        />
        Challenges
      </h3>
      <p className="my-4">
        Take on a challenge this month! Complete more green habits, make a
        positive impact, and collect points along the way.
      </p>
      <CardSection className="flex flex-row flex-wrap justify-start items-start gap-4 flex-none px-4">
        {challenges.map((challenge: IChallenge) => (
          <Link
            to={`/challenge/${challenge.habitIdentifier}`}
            key={challenge._id}
            className="group flex flex-col items-center justify-center transition-transform duration-200 transform hover:scale-105"
          >
            <div className="w-32 h-32 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full shadow-sm flex items-center justify-center border-2 border-white hover:border-emerald-500">
              <img
                src={challengeIcons[challenge.name]}
                alt={challenge.description}
                className="w-28 h-28 object-contain rounded-full"
              />
            </div>
          </Link>
        ))}
      </CardSection>
      <h3 className="flex items-center">
        <img
          src={ecoIcon}
          alt="Eco Icon"
          className="w-5 h-5 mr-2 inline-block"
        />
        Eco-tip of the day
      </h3>

      <CardSection className="mb-20">
        <div>
          <h4>{ecotip.name}</h4>
          <p className="mt-2">{ecotip.description}</p>
        </div>
      </CardSection>
    </>
  );
};
