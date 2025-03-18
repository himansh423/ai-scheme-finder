"use client";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { userAction } from "@/redux/userSlice";
import { schemeAction } from "@/redux/schemeSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });

interface Scheme {
  name: string;
  TrustScore: string;
  category: string;
  eligibility: string;
  reason: string;
  schemeId: string;
}

const SavedScheme = () => {
  const { comparisonList, schemes,showModal } = useSelector(
    (store: RootState) => store.scheme
  );
  const { loggedInUser } = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();
  const router = useRouter();
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

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const res = await axios.get("/api/auth/decode-token");
        if (res.data.success) {
          dispatch(userAction.setLoggedInUser({ data: res.data.user }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchLoggedInUser();
  }, [dispatch]);

  useEffect(() => {
    const getSavedSchemes = async () => {
      if (!loggedInUser?.userId) return;

      try {
        const res = await axios.get(
          `/api/get-saved-schemes/${loggedInUser.userId}`
        );
        if (res.data.success) {
          dispatch(schemeAction.setSchemes({ data: res.data.data }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSavedSchemes();
  }, [loggedInUser, dispatch]);

  const handleSaveScheme = async (scheme: Scheme) => {
    if (schemes.some((savedScheme) => savedScheme.name === scheme.name)) {
      try {
        const payload = {
          schemeId: scheme.schemeId,
        };
        const res = await axios.delete(
          `/api/unsave-scheme/${loggedInUser?.userId}`,
          { data: payload }
        );
        if (res.data.success) {
          dispatch(
            schemeAction.setSchemes({
              data: schemes.filter(
                (savedScheme) => savedScheme.schemeId !== scheme.schemeId
              ),
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const payload = {
          name: scheme.name,
          TrustScore: scheme.TrustScore,
          category: scheme.category,
          eligibility: scheme.eligibility,
          reason: scheme.reason,
          schemeId: scheme.schemeId,
        };
        const res = await axios.patch(
          `/api/save-scheme/${loggedInUser?.userId}`,
          payload
        );
        if (res.data.success) {
          dispatch(schemeAction.setSchemes({ data: [...schemes, scheme] }));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleAddToComparison = (scheme: Scheme) => {
    if (
      comparisonList.some((compareScheme) => compareScheme.name === scheme.name)
    ) {
      dispatch(
        schemeAction.setComparisonList({
          data: comparisonList.filter(
            (compareScheme) => compareScheme.name !== scheme.name
          ),
        })
      );
    } else {
      dispatch(
        schemeAction.setComparisonList({ data: [...comparisonList, scheme] })
      );
    }
  };

  const handleCompareClick = () => {
    if (comparisonList.length < 2) {
      dispatch(schemeAction.setShowModal());
    } else {
      router.push("/compare");
    }
  };

  return (
    <div className="w-screen min-h-screen px-7 py-11">
      <div className="w-screen  mb-7">
        <h1
          className={`${bebasNeue.className} text-6xl text-center text-[#ffffff]`}
        >
          Saved Schemes
        </h1>
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
                  onClick={() => handleSaveScheme(scheme)}
                  className={`bg-[#111111] hover:bg-[#222222] text-[#E5E5E5] border border-[#333333] ${
                    schemes.some(
                      (savedScheme) => savedScheme.name === scheme.name
                    )
                      ? "bg-[#222222]"
                      : ""
                  }`}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {schemes.some(
                    (savedScheme) => savedScheme.name === scheme.name
                  )
                    ? "Saved"
                    : "Save"}
                </Button>

                <Button className="bg-[#111111] hover:bg-[#222222] text-[#E5E5E5] border border-[#333333]">
                  <MessageSquare className="mr-2 h-4 w-4" /> ASK AI
                </Button>

                <Button
                  onClick={() => handleAddToComparison(scheme)}
                  className={`bg-[#111111] hover:bg-[#222222] text-[#E5E5E5] border border-[#333333] ${
                    comparisonList.some(
                      (compareScheme) => compareScheme.name === scheme.name
                    )
                      ? "bg-[#222222]"
                      : ""
                  }`}
                >
                  <BarChart2 className="mr-2 h-4 w-4" />
                  {comparisonList.some(
                    (compareScheme) => compareScheme.name === scheme.name
                  )
                    ? "Added"
                    : "Compare"}
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
      {comparisonList.length > 0 && (
        <div className="fixed bottom-6 right-6">
          <Button
            onClick={handleCompareClick}
            className="bg-[#111111] hover:bg-[#222222] text-[#E5E5E5] border border-[#333333] shadow-lg"
          >
            Compare ({comparisonList.length}){" "}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#222222] p-6 rounded-lg shadow-lg text-center">
            <p className="text-[#E5E5E5]">Add at least 2 schemes to compare.</p>
            <Button
              onClick={() => dispatch(schemeAction.setShowModal())}
              className="mt-4 bg-[#111111] hover:bg-[#222222] text-[#E5E5E5] border border-[#333333]"
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedScheme;
