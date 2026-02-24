import { useState, useCallback } from "react";
import { Upload, X, FileText, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

const subjects = [
  "Data Structures", "Operating Systems", "DBMS", "Computer Networks",
  "Software Engineering", "Machine Learning", "Digital Logic", "Discrete Math",
];

const examTypes = ["CAT 1", "CAT 2", "FAT", "Lab Manual", "Quiz", "Assignment"];

type UploadState = "form" | "uploading" | "success";

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadModal({ open, onOpenChange }: UploadModalProps) {
  const [state, setState] = useState<UploadState>("form");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const simulateUpload = () => {
    setState("uploading");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setState("success"), 300);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 200);
  };

  const reset = () => {
    setState("form");
    setFile(null);
    setProgress(0);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={reset}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <AnimatePresence mode="wait">
          {state === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader>
                <DialogTitle className="text-foreground">Upload Resource</DialogTitle>
              </DialogHeader>

              <div className="mt-4 space-y-4">
                {/* Drop zone */}
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors cursor-pointer ${
                    dragActive
                      ? "border-primary bg-primary/5"
                      : file
                      ? "border-success/50 bg-success/5"
                      : "border-border hover:border-muted-foreground"
                  }`}
                  onClick={() => document.getElementById("file-input")?.click()}
                >
                  <input
                    id="file-input"
                    type="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    onChange={handleFileChange}
                  />
                  {file ? (
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-success" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                      <p className="text-sm text-muted-foreground">
                        Drag & drop your file here, or{" "}
                        <span className="text-primary font-medium">browse</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or Images up to 20MB</p>
                    </>
                  )}
                </div>

                <div>
                  <Label className="text-foreground text-sm">Title</Label>
                  <Input placeholder="e.g. OS CAT 1 2024 Solutions" className="mt-1 bg-secondary border-border" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-foreground text-sm">Subject</Label>
                    <Select>
                      <SelectTrigger className="mt-1 bg-secondary border-border">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {subjects.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-foreground text-sm">Exam Type</Label>
                    <Select>
                      <SelectTrigger className="mt-1 bg-secondary border-border">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {examTypes.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-foreground text-sm">Faculty Name</Label>
                  <Input placeholder="e.g. Dr. Ramesh Kumar" className="mt-1 bg-secondary border-border" />
                </div>

                <Button
                  onClick={simulateUpload}
                  disabled={!file}
                  className="w-full h-11 gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Upload & Earn Credits
                </Button>
              </div>
            </motion.div>
          )}

          {state === "uploading" && (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-12"
            >
              <div className="animate-float">
                <Upload className="h-12 w-12 text-primary" />
              </div>
              <p className="mt-4 text-foreground font-semibold">Uploading...</p>
              <p className="text-sm text-muted-foreground mt-1">
                {Math.min(Math.round(progress), 100)}% complete
              </p>
              <Progress
                value={Math.min(progress, 100)}
                className="mt-4 w-64 h-2"
              />
            </motion.div>
          )}

          {state === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              >
                <CheckCircle2 className="h-16 w-16 text-success" />
              </motion.div>
              <h3 className="mt-4 text-xl font-bold text-foreground">Success!</h3>
              <div className="mt-2 flex items-center gap-2 text-credit font-semibold">
                <Zap className="h-5 w-5" />
                +5 Download Credits Earned
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Your contribution helps the community!
              </p>
              <Button onClick={reset} className="mt-6">
                Done
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
