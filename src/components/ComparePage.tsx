"use client";
import type { RootState } from "@/redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Star,
  ArrowLeft,
  BarChart2,
  Check,
  MessageSquare,
  Sparkles,
  Loader2,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Bebas_Neue } from "next/font/google";
import { schemeAction } from "@/redux/schemeSlice";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });

interface Scheme {
  name: string;
  TrustScore: string;
  category: string;
  eligibility: string;
  reason: string;
  schemeId: string;
}

interface ComparisonResult {
  bestScheme: string;
  reasoning: string;
  comparisonTable: {
    [key: string]: {
      advantages: string[];
      disadvantages: string[];
      suitabilityScore: number;
    };
  };
  detailedAnalysis: string;
}

const ComparePage = () => {
  const { comparisonList } = useSelector((store: RootState) => store.scheme);
  const { userInput } = useSelector((store: RootState) => store.userInput);
  const dispatch = useDispatch();
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [comparisonResult, setComparisonResult] =
    useState<ComparisonResult | null>(null);

  const handleRemoveFromComparison = (scheme: Scheme) => {
    dispatch(
      schemeAction.setComparisonList({
        data: comparisonList.filter(
          (compareScheme) => compareScheme.name !== scheme.name
        ),
      })
    );
  };

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

  const analyzeSchemes = async () => {
    setIsAnalyzing(true);
    try {
      const response = await axios.post("/api/analyze-schemes", {
        schemes: comparisonList,
        userProfile: userInput,
      });

      setComparisonResult(response.data);
      toast({
        title: "Analysis Complete",
        description: `${response.data.bestScheme} is recommended as the best scheme for you.`,
      });
    } catch (error) {
      console.error("Error analyzing schemes:", error);
      toast({
        title: "Analysis Failed",
        description:
          (error as any)?.response?.data?.error ||
          "Failed to analyze schemes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#E5E5E5] p-6">
      <div className="flex items-center mb-8">
        <Link href="/" className="mr-4">
          <Button
            variant="outline"
            size="icon"
            className="bg-[#111111] border-[#333333] hover:bg-[#222222] text-[#E5E5E5]"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className={`text-3xl text-[#E5E5E5] ${bebasNeue.className}`}>
          SCHEME COMPARISON
        </h1>
      </div>

      {comparisonList.length === 0 ? (
        <div className="bg-[#111111] rounded-xl p-10 border border-[#222222] shadow-lg text-center">
          <h2 className={`text-2xl mb-4 text-[#E5E5E5] ${bebasNeue.className}`}>
            NO SCHEMES TO COMPARE
          </h2>
          <p className="text-[#999999] mb-6">
            Add schemes to your comparison list to see an AI-powered analysis.
          </p>
          <Link href="/">
            <Button className="bg-[#222222] hover:bg-[#333333] text-[#E5E5E5]">
              Browse Schemes
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-2xl text-[#E5E5E5] ${bebasNeue.className}`}>
              SCHEMES TO COMPARE ({comparisonList.length})
            </h2>
            {comparisonList.length >= 2 &&
              !isAnalyzing &&
              !comparisonResult && (
                <Button
                  onClick={analyzeSchemes}
                  className="bg-[#222222] hover:bg-[#333333] text-[#E5E5E5]"
                >
                  <Sparkles className="mr-2 h-4 w-4" /> Analyze with AI
                </Button>
              )}
            {isAnalyzing && (
              <Button disabled className="bg-[#222222] text-[#E5E5E5]">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {comparisonList.map((scheme, index) => (
              <div
                key={index}
                className="bg-[#0A0A0A] rounded-xl overflow-hidden border border-[#222222] shadow-xl h-full flex flex-col relative"
              >
                {comparisonResult &&
                  comparisonResult.bestScheme === scheme.name && (
                    <div className="absolute -top-3 -right-3 bg-yellow-500 text-black rounded-full p-1 z-10">
                      <Trophy className="h-5 w-5" />
                    </div>
                  )}
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

                  {comparisonResult &&
                    comparisonResult.comparisonTable[scheme.name] && (
                      <div className="bg-[#111111] rounded-lg p-4 mt-2">
                        <p
                          className={`text-[#999999] text-sm mb-2 ${bebasNeue.className}`}
                        >
                          AI ANALYSIS
                        </p>
                        <p className="text-yellow-500 font-medium mb-2">
                          Suitability Score:{" "}
                          {
                            comparisonResult.comparisonTable[scheme.name]
                              .suitabilityScore
                          }
                          %
                        </p>
                        <div className="mb-2">
                          <p
                            className={`text-[#999999] text-xs ${bebasNeue.className}`}
                          >
                            ADVANTAGES
                          </p>
                          <ul className="mt-1 space-y-1">
                            {comparisonResult.comparisonTable[
                              scheme.name
                            ].advantages.map((adv, i) => (
                              <li
                                key={i}
                                className="text-[#E5E5E5] text-xs flex items-start"
                              >
                                <Check className="h-3 w-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                                <span>{adv}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p
                            className={`text-[#999999] text-xs ${bebasNeue.className}`}
                          >
                            DISADVANTAGES
                          </p>
                          <ul className="mt-1 space-y-1">
                            {comparisonResult.comparisonTable[
                              scheme.name
                            ].disadvantages.map((disadv, i) => (
                              <li
                                key={i}
                                className="text-[#E5E5E5] text-xs flex items-start"
                              >
                                <span className="text-red-500 mr-1">•</span>
                                <span>{disadv}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                  <div className="flex flex-wrap gap-2 mt-auto">
                    <Button
                      onClick={() => handleRemoveFromComparison(scheme)}
                      className="bg-[#111111] hover:bg-[#222222] text-[#E5E5E5] border border-[#333333]"
                    >
                      Remove
                    </Button>

                    <Button className="bg-[#111111] hover:bg-[#222222] text-[#E5E5E5] border border-[#333333]">
                      <MessageSquare className="mr-2 h-4 w-4" /> ASK AI
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {comparisonResult && (
            <div className="bg-[#111111] rounded-xl p-6 border border-[#222222] shadow-lg mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                <h2
                  className={`text-2xl text-[#E5E5E5] ${bebasNeue.className}`}
                >
                  AI RECOMMENDATION
                </h2>
              </div>

              <div className="bg-[#0A0A0A] p-5 rounded-lg border border-[#222222]">
                <div className="flex items-start gap-3 mb-4">
                  <Trophy className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3
                      className={`text-xl text-[#E5E5E5] mb-2 ${bebasNeue.className}`}
                    >
                      BEST SCHEME FOR YOU
                    </h3>
                    <p className="text-yellow-500 font-semibold text-lg mb-2">
                      {comparisonResult.bestScheme}
                    </p>
                    <p className="text-[#E5E5E5] mb-4">
                      {comparisonResult.reasoning}
                    </p>

                    <Separator className="bg-[#222222] my-4" />

                    <h4
                      className={`text-lg text-[#E5E5E5] mb-2 ${bebasNeue.className}`}
                    >
                      DETAILED ANALYSIS
                    </h4>
                    <p className="text-[#E5E5E5] text-sm whitespace-pre-line">
                      {comparisonResult.detailedAnalysis}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ComparePage;