import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FileText, Image, Download, Lock, Star, SlidersHorizontal,
  Grid3X3, List, X, Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { UploadModal } from "@/components/UploadModal";
import { motion } from "framer-motion";

const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
const examTypes = ["CAT 1", "CAT 2", "FAT", "Lab Manual", "Quiz", "Assignment"];
const subjects = [
  "Data Structures", "Operating Systems", "DBMS", "Computer Networks",
  "Software Engineering", "Machine Learning",
];

interface Resource {
  id: number;
  title: string;
  format: "pdf" | "image";
  uploader: string;
  reputation: number;
  subject: string;
  examType: string;
  semester: string;
  downloads: number;
}

const mockResources: Resource[] = [
  { id: 1, title: "OS CAT 1 2024 - Solutions", format: "pdf", uploader: "Arjun M.", reputation: 4.8, subject: "Operating Systems", examType: "CAT 1", semester: "4", downloads: 342 },
  { id: 2, title: "DBMS ER Diagram Notes", format: "pdf", uploader: "Priya S.", reputation: 4.6, subject: "DBMS", examType: "Assignment", semester: "3", downloads: 218 },
  { id: 3, title: "CN Lab Manual - Complete", format: "pdf", uploader: "Karthik R.", reputation: 4.9, subject: "Computer Networks", examType: "Lab Manual", semester: "5", downloads: 567 },
  { id: 4, title: "DS Stack & Queue Cheatsheet", format: "image", uploader: "Sneha K.", reputation: 4.3, subject: "Data Structures", examType: "CAT 2", semester: "3", downloads: 189 },
  { id: 5, title: "ML Linear Regression Derivation", format: "pdf", uploader: "Rahul V.", reputation: 4.7, subject: "Machine Learning", examType: "FAT", semester: "6", downloads: 411 },
  { id: 6, title: "SE UML Diagrams Collection", format: "image", uploader: "Anjali D.", reputation: 4.5, subject: "Software Engineering", examType: "Assignment", semester: "5", downloads: 156 },
  { id: 7, title: "OS Process Scheduling Notes", format: "pdf", uploader: "Vikram P.", reputation: 4.4, subject: "Operating Systems", examType: "CAT 2", semester: "4", downloads: 289 },
  { id: 8, title: "DBMS Normalization FAT Paper", format: "pdf", uploader: "Divya R.", reputation: 4.8, subject: "DBMS", examType: "FAT", semester: "3", downloads: 478 },
];

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [uploadOpen, setUploadOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("upload") === "true") {
      setUploadOpen(true);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);
  const [credits] = useState(0); // simulating 0 credits for locked state
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState<string>("");
  const [examType, setExamType] = useState<string>("");
  const [subject, setSubject] = useState<string>("");

  const filtered = mockResources.filter((r) => {
    if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (semester && r.semester !== semester) return false;
    if (examType && r.examType !== examType) return false;
    if (subject && r.subject !== subject) return false;
    return true;
  });

  const clearFilters = () => {
    setSemester("");
    setExamType("");
    setSubject("");
    setSearch("");
  };

  const hasFilters = semester || examType || subject;

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Resource Library</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {filtered.length} resources available
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="md:hidden gap-2 border-border"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
            <div className="flex rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            <Button size="sm" className="gap-2" onClick={() => setUploadOpen(true)}>
              <Upload className="h-3.5 w-3.5" />
              Upload
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters (desktop) */}
          <aside className={`shrink-0 w-60 space-y-5 ${filtersOpen ? "block" : "hidden"} md:block`}>
            <div>
              <Input
                placeholder="Search resources..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-secondary border-border"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Semester</label>
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger className="mt-1.5 bg-secondary border-border">
                  <SelectValue placeholder="All Semesters" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {semesters.map((s) => (
                    <SelectItem key={s} value={s}>Semester {s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Exam Type</label>
              <Select value={examType} onValueChange={setExamType}>
                <SelectTrigger className="mt-1.5 bg-secondary border-border">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {examTypes.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Subject</label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className="mt-1.5 bg-secondary border-border">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {subjects.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground gap-1"
              >
                <X className="h-3.5 w-3.5" />
                Clear filters
              </Button>
            )}
          </aside>

          {/* Main Feed */}
          <div className="flex-1 min-w-0">
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "flex flex-col gap-3"
              }
            >
              {filtered.map((resource, i) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`rounded-xl border border-border bg-card p-4 card-hover ${
                    viewMode === "list" ? "flex items-center gap-4" : ""
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                      resource.format === "pdf"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-primary/10 text-primary"
                    } ${viewMode === "grid" ? "mb-3" : ""}`}
                  >
                    {resource.format === "pdf" ? (
                      <FileText className="h-5 w-5" />
                    ) : (
                      <Image className="h-5 w-5" />
                    )}
                  </div>

                  <div className={`flex-1 min-w-0 ${viewMode === "grid" ? "" : ""}`}>
                    <h3 className="font-semibold text-sm text-foreground truncate">
                      {resource.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{resource.uploader}</span>
                      <span className="flex items-center gap-0.5 text-xs text-credit">
                        <Star className="h-3 w-3 fill-credit" />
                        {resource.reputation}
                      </span>
                    </div>
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-secondary text-muted-foreground">
                        {resource.examType}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-secondary text-muted-foreground">
                        Sem {resource.semester}
                      </Badge>
                    </div>
                  </div>

                  {/* Download button */}
                  <div className={viewMode === "grid" ? "mt-4" : "shrink-0"}>
                    {credits > 0 ? (
                      <Button size="sm" className="w-full gap-2">
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </Button>
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full gap-2 border-border text-muted-foreground cursor-not-allowed opacity-70"
                            onClick={() => setUploadOpen(true)}
                          >
                            <Lock className="h-3.5 w-3.5" />
                            Locked
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-popover border-border text-popover-foreground">
                          Upload 1 file to unlock 5 downloads
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="flex flex-col items-center py-20 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="font-semibold text-foreground">No resources found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <UploadModal open={uploadOpen} onOpenChange={setUploadOpen} />
    </div>
  );
};

export default Dashboard;
