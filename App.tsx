
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { StepIndicator } from './components/StepIndicator';
import { AdPlatform, AdFormat, AdGoal, CampaignData, GenerationResult } from './types';
import { generateAdCopy } from './geminiService';

const PLATFORMS: AdPlatform[] = ['Facebook/Instagram', 'Google Search', 'LinkedIn', 'TikTok', 'YouTube', 'Twitter (X)'];
const FORMATS: AdFormat[] = ['Image', 'Video', 'Carousel', 'Dynamic/Responsive', 'Text Only'];
const GOALS: AdGoal[] = ['Website Traffic', 'Lead Generation', 'WhatsApp/Messaging', 'Direct Sales (eCom)', 'Brand Awareness'];

const inputClasses = "w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all";

export default function App() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<GenerationResult | null>(null);
  
  const [formData, setFormData] = useState<CampaignData>({
    businessName: '',
    productDescription: '',
    targetAudience: '',
    platform: 'Facebook/Instagram',
    format: 'Image',
    goal: 'Website Traffic',
    tone: 'Conversational & Genuine',
    uniqueSellingPoints: '',
    callToAction: 'Shop Now',
    country: '',
    city: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep(prev => Math.min(prev + 1, 6));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const generated = await generateAdCopy(formData);
      setResults(generated);
      setStep(7);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1);
    setResults(null);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-3xl font-bold">Business Context</h2>
            <p className="text-slate-500">The foundation of a high-conversion ad is a deep understanding of the product.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-700">Business Name</label>
                <input 
                  type="text" name="businessName" value={formData.businessName} onChange={handleChange}
                  placeholder="e.g. Zest Digital Agency"
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-700">Product/Service Details</label>
                <textarea 
                  name="productDescription" value={formData.productDescription} onChange={handleChange}
                  rows={4}
                  placeholder="Explain exactly what you are offering and who it's for..."
                  className={inputClasses}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-3xl font-bold">Channel & Goal</h2>
            <p className="text-slate-500">Each platform requires a different psychology.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-700">Platform</label>
                <select name="platform" value={formData.platform} onChange={handleChange} className={inputClasses}>
                  {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-700">Ad Goal</label>
                <select name="goal" value={formData.goal} onChange={handleChange} className={inputClasses}>
                  {GOALS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-3xl font-bold">Deep Local Research</h2>
            <p className="text-slate-500">Enter your target city. AI will find exact neighborhoods and zip codes for your ads.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-700">Country</label>
                <input 
                  type="text" name="country" value={formData.country} onChange={handleChange}
                  placeholder="e.g. Pakistan"
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-700">City</label>
                <input 
                  type="text" name="city" value={formData.city} onChange={handleChange}
                  placeholder="e.g. Karachi"
                  className={inputClasses}
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-3xl font-bold">Target Audience Profile</h2>
            <p className="text-slate-500">Who are we talking to? This influences the AI's neighborhood search.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-700">Ideal Customer Avatar</label>
                <input 
                  type="text" name="targetAudience" value={formData.targetAudience} onChange={handleChange}
                  placeholder="e.g. Fitness enthusiasts looking for meal prep in urban areas"
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-700">Unique Selling Points</label>
                <textarea 
                  name="uniqueSellingPoints" value={formData.uniqueSellingPoints} onChange={handleChange}
                  rows={3}
                  placeholder="What makes you better than your local competitors?"
                  className={inputClasses}
                />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-3xl font-bold">Messaging Style</h2>
            <p className="text-slate-500">Humanize the interaction to increase trust.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-700">Tone of Voice</label>
                <input 
                  type="text" name="tone" value={formData.tone} onChange={handleChange}
                  placeholder="e.g. Empathetic, Direct, Relatable"
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-700">Primary CTA</label>
                <input 
                  type="text" name="callToAction" value={formData.callToAction} onChange={handleChange}
                  placeholder="e.g. Get Started Today"
                  className={inputClasses}
                />
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-blue-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-4xl font-black">Begin Local Intelligence</h2>
            <p className="text-slate-500 max-w-md mx-auto text-lg">
              We're identifying your competitors and finding the exact streets in <strong>{formData.city}</strong> where your customers live.
            </p>
          </div>
        );
      case 7:
        if (!results) return null;

        const groupedAreas = {
          High: results.marketResearch.localAreas.filter(a => a.potential === 'High'),
          Medium: results.marketResearch.localAreas.filter(a => a.potential === 'Medium'),
          Low: results.marketResearch.localAreas.filter(a => a.potential === 'Low'),
        };

        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-8">
              <div>
                <h2 className="text-5xl font-black tracking-tight text-slate-900">Ad Intelligence Report</h2>
                <p className="text-slate-500 mt-2 text-lg">Platform: {formData.platform} | Target: {formData.city}, {formData.country}</p>
              </div>
              <button onClick={reset} className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl">Start New Campaign</button>
            </div>

            {/* Expansive Deep Research Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Area Analysis - Grouped by Potential */}
              <div className="lg:col-span-8 bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-black text-2xl text-slate-900 flex items-center gap-3">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    </div>
                    Segmented Area Analysis
                  </h3>
                  <div className="flex gap-2">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 uppercase tracking-wider">High Intent</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-100 uppercase tracking-wider">Medium Intent</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-200 uppercase tracking-wider">Awareness</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* High Potential column */}
                  <div className="space-y-4">
                    <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-2 px-2">🔥 High Potential</div>
                    {groupedAreas.High.map((area, idx) => (
                      <div key={idx} className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 group hover:scale-[1.02] transition-all">
                        <div className="font-black text-emerald-900 text-sm">{area.name}</div>
                        <div className="text-xs text-emerald-700 mt-1 leading-tight">{area.reason}</div>
                      </div>
                    ))}
                  </div>

                  {/* Medium Potential column */}
                  <div className="space-y-4">
                    <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] mb-2 px-2">⚡ Medium Intent</div>
                    {groupedAreas.Medium.map((area, idx) => (
                      <div key={idx} className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100 group hover:scale-[1.02] transition-all">
                        <div className="font-black text-amber-900 text-sm">{area.name}</div>
                        <div className="text-xs text-amber-700 mt-1 leading-tight">{area.reason}</div>
                      </div>
                    ))}
                  </div>

                  {/* Low Potential column */}
                  <div className="space-y-4">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-2">🌍 Low / Awareness</div>
                    {groupedAreas.Low.map((area, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:scale-[1.02] transition-all">
                        <div className="font-black text-slate-800 text-sm">{area.name}</div>
                        <div className="text-xs text-slate-500 mt-1 leading-tight">{area.reason}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
                  <h3 className="font-black text-xl text-slate-900 mb-6 flex items-center gap-3">
                    <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                    </div>
                    Competitors
                  </h3>
                  <div className="space-y-4">
                    {results.marketResearch.competitors.map((comp, idx) => (
                      <div key={idx} className="p-4 bg-red-50/30 rounded-2xl border border-red-100">
                        <div className="font-black text-slate-900 text-sm">{comp.name}</div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">{comp.strategy}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl">
                  <h3 className="font-black text-xl mb-6 flex items-center gap-3">
                    <div className="p-2 bg-slate-800 text-blue-400 rounded-lg">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                    </div>
                    Targeting
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase block mb-2 tracking-widest">Interests</span>
                      <div className="flex flex-wrap gap-2">
                        {results.marketResearch.audienceTargeting.interests.map(i => (
                          <span key={i} className="px-3 py-1 bg-slate-800 text-blue-400 text-[10px] font-bold rounded-lg border border-slate-700">{i}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase block mb-2 tracking-widest">Demographics</span>
                      <p className="text-slate-300 font-medium text-xs leading-relaxed">{results.marketResearch.audienceTargeting.demographics}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ad Variations Section */}
            <div className="space-y-12 pt-8">
              <h3 className="text-3xl font-black text-slate-900">Conversion Variations</h3>
              {results.options.map((option, idx) => (
                <div key={option.id} className="bg-white rounded-[3rem] border-2 border-slate-100 shadow-xl overflow-hidden hover:border-blue-500 transition-all duration-500">
                  <div className="bg-slate-900 px-10 py-5 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                        <span className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em]">Variation</span>
                        <span className="text-white font-black text-2xl tracking-tight">OPTION {idx + 1}</span>
                      </div>
                      <div className="h-10 w-[1px] bg-slate-800"></div>
                      <div className="flex flex-col">
                        <span className="text-blue-500 text-[10px] uppercase font-bold tracking-[0.2em]">Focus Hook</span>
                        <span className="text-blue-100 font-bold text-lg tracking-tight">{option.focusKeyword}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                      <div className="space-y-8">
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Headline</label>
                          <h4 className="text-3xl font-black text-slate-900 leading-tight">{option.headline}</h4>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Primary Text</label>
                          <p className="text-slate-700 text-lg whitespace-pre-wrap leading-relaxed font-medium">{option.primaryText}</p>
                        </div>
                        <div className="pt-4">
                           <button className="px-10 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 active:scale-95 text-lg">
                             {option.ctaText}
                           </button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-8">
                        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 h-full">
                           <div className="space-y-6">
                              <div>
                               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 block">Focus Keywords</label>
                               <div className="flex flex-wrap gap-2">
                                 {option.keywords.map(kw => (
                                   <span key={kw} className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 shadow-sm">
                                     {kw}
                                   </span>
                                 ))}
                               </div>
                              </div>
                              <div className="pt-6 border-t border-slate-200">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Reasoning</label>
                                <p className="text-slate-600 italic text-sm leading-relaxed font-medium">"{option.reasoning}"</p>
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {step < 7 && (
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/80 border border-slate-100 p-8 md:p-20 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
               <svg className="w-64 h-64 text-slate-300" fill="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            
            <StepIndicator currentStep={step} totalSteps={6} />
            <div className="min-h-[450px] mt-12 relative z-10">
              {renderStep()}
            </div>
            <div className="mt-20 flex justify-between gap-6 relative z-10">
              {step > 1 ? (
                <button onClick={handleBack} className="px-12 py-5 rounded-3xl font-black text-slate-500 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200">Go Back</button>
              ) : <div />}
              {step < 6 ? (
                <button onClick={handleNext} className="px-16 py-5 bg-slate-900 text-white rounded-3xl font-black hover:bg-slate-800 transition-all shadow-2xl shadow-slate-300">Continue</button>
              ) : (
                <button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="px-20 py-5 bg-blue-600 text-white rounded-3xl font-black hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 flex items-center gap-4 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Searching for Hotspots...
                    </>
                  ) : 'Generate Intelligence Report'}
                </button>
              )}
            </div>
          </div>
        )}
        {step === 7 && renderStep()}
      </div>
    </Layout>
  );
}
