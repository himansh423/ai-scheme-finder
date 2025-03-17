import {
  Star,
  Save,
  MessageSquare,
  BarChart2,
  Check,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Bebas_Neue } from "next/font/google";
import axios from "axios";
import { cookies } from "next/headers";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });

interface Scheme {
  name: string;
  TrustScore: string;
  category: string;
  eligibility: string;
  reason: string;
}

const getSavedSchemes = async (userId: string) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/get-saved-schemes/${userId}`
    );
    if (res.data.success) {
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

const fetchUserDataFromCookie = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/decode-token",
        {
          headers: { Cookie: `token=${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();
      if (data?.user) {
        return data.user;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
};
const SavedScheme = async () => {
  const loggedInUser = await fetchUserDataFromCookie();
  const schemes = await getSavedSchemes(loggedInUser.userId);
  // const [comparisonList, setComparisonList] = useState<string[]>([]);
  // const [savedSchemes, setSavedSchemes] = useState<string[]>([]);
  const renderTrustScore = (score: string) => {
    const stars = [];
    const trustScore = Number(score);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < trustScore
              ? "fill-yellow-500 text-yellow-500"
              : "text-[#333333] fill-[#333333]"
          }`}
        />
      );
    }
    return stars;
  };

  // const handleSaveScheme = (schemeName: string) => {
  //   if (savedSchemes.includes(schemeName)) {
  //     setSavedSchemes(savedSchemes.filter((name) => name !== schemeName));
  //   } else {
  //     setSavedSchemes([...savedSchemes, schemeName]);
  //   }
  // };

  // const handleAddToComparison = (schemeName: string) => {
  //   if (comparisonList.includes(schemeName)) {
  //     setComparisonList(comparisonList.filter((name) => name !== schemeName));
  //   } else {
  //     setComparisonList([...comparisonList, schemeName]);
  //   }
  // };
  return (
    <div className="w-screen min-h-screen px-7 py-11">
      <div className="w-screen  mb-7">
          <h1 className={`${bebasNeue.className} text-6xl text-center text-[#ffffff]`}>Saved Schemes</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {schemes?.map((scheme: Scheme, index: number) => (
          <div
            key={index}
            className="bg-[#0A0A0A] rounded-xl overflow-hidden border border-[#222222] shadow-xl h-full flex flex-col"
          >
            <div className="bg-[#111111] p-4 border-b border-[#222222]">
              <div className="flex justify-between items-start">
                <h2
                  className={`text-xl text-[#E5E5E5] ${bebasNeue.className} h-14 flex items-center`}
                >
                  {scheme.name}
                </h2>
                <div className="flex">
                  {renderTrustScore(scheme.TrustScore || "4")}
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4 flex-grow flex flex-col">
              <div className="flex items-start gap-3">
                <div className="bg-[#111111] p-2 rounded-full min-w-[36px] flex items-center justify-center">
                  <BarChart2 className="h-5 w-5 text-[#999999]" />
                </div>
                <div>
                  <p
                    className={`text-[#999999] text-sm ${bebasNeue.className}`}
                  >
                    CATEGORY
                  </p>
                  <p className="text-[#E5E5E5] font-medium h-6 flex items-center">
                    {scheme.category}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-[#111111] p-2 rounded-full min-w-[36px] flex items-center justify-center">
                  <Check className="h-5 w-5 text-[#999999]" />
                </div>
                <div>
                  <p
                    className={`text-[#999999] text-sm ${bebasNeue.className}`}
                  >
                    ELIGIBILITY
                  </p>
                  <p className="text-[#E5E5E5] font-medium min-h-6">
                    {scheme.eligibility}
                  </p>
                </div>
              </div>

              <div className="bg-[#111111] rounded-lg p-4 mt-4 flex-grow">
                <p
                  className={`text-[#999999] text-sm mb-2 ${bebasNeue.className}`}
                >
                  WHY RECOMMENDED
                </p>
                <p className="text-[#E5E5E5] text-sm min-h-[80px]">
                  {scheme.reason ||
                    "This scheme aligns perfectly with your profile and financial goals."}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                <Button
                  // onClick={() => handleSaveScheme(scheme.name)}
                  className={`bg-[#111111] hover:bg-[#222222] text-[#E5E5E5] border border-[#333333] 
                   
                  `}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Saved
                </Button>

                <Button className="bg-[#111111] hover:bg-[#222222] text-[#E5E5E5] border border-[#333333]">
                  <MessageSquare className="mr-2 h-4 w-4" /> ASK AI
                </Button>

                <Button
                  // onClick={() => handleAddToComparison(scheme.name)}
                  className={`bg-[#111111] hover:bg-[#222222] text-[#E5E5E5] border border-[#333333] `}
                >
                  <BarChart2 className="mr-2 h-4 w-4" />
                  added
                </Button>
              </div>
            </div>

            <div className="bg-[#111111] p-3 border-t border-[#222222] mt-auto">
              <Button
                variant="link"
                className="text-[#999999] hover:text-[#E5E5E5] p-0 h-auto flex items-center"
              >
                View Details <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedScheme;
