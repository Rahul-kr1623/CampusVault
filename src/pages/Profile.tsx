import { useState } from "react";
import { Zap, Upload, Download, FileText, Star, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const myUploads = [
  { id: 1, title: "OS CAT 1 2024 - Solutions", date: "2024-12-15", downloads: 342, subject: "Operating Systems" },
  { id: 2, title: "DS Stack & Queue Cheatsheet", date: "2024-11-28", downloads: 189, subject: "Data Structures" },
  { id: 3, title: "ML Linear Regression Notes", date: "2024-11-10", downloads: 411, subject: "Machine Learning" },
];

const myDownloads = [
  { id: 1, title: "DBMS Normalization FAT Paper", date: "2024-12-20", uploader: "Divya R.", subject: "DBMS" },
  { id: 2, title: "CN Lab Manual - Complete", date: "2024-12-18", uploader: "Karthik R.", subject: "Computer Networks" },
  { id: 3, title: "SE UML Diagrams Collection", date: "2024-12-10", uploader: "Anjali D.", subject: "Software Engineering" },
];

const Profile = () => {
  const [credits] = useState(12);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center mb-10"
        >
          <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary mb-4">
            AM
          </div>
          <h1 className="text-2xl font-bold text-foreground">Arjun Mehta</h1>
          <p className="text-sm text-muted-foreground mt-1">
            4th Semester • Computer Science
          </p>
          <div className="flex items-center gap-1 mt-2">
            <Star className="h-4 w-4 fill-credit text-credit" />
            <span className="text-sm font-medium text-foreground">4.8 Reputation</span>
          </div>
        </motion.div>

        {/* Credit Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border bg-card p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Credit Balance</p>
              <div className="flex items-center gap-2 mt-1">
                <Zap className="h-6 w-6 text-credit" />
                <span className="text-4xl font-bold text-foreground stat-glow">{credits}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                1 upload = 5 credits • 1 download = 1 credit
              </p>
            </div>
            <div className="text-right space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Upload className="h-4 w-4 text-success" />
                <span>{myUploads.length} uploaded</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Download className="h-4 w-4 text-primary" />
                <span>{myDownloads.length} downloaded</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="uploads">
          <TabsList className="w-full bg-secondary border border-border">
            <TabsTrigger value="uploads" className="flex-1 gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <Upload className="h-3.5 w-3.5" />
              My Uploads
            </TabsTrigger>
            <TabsTrigger value="downloads" className="flex-1 gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <Download className="h-3.5 w-3.5" />
              Downloads
            </TabsTrigger>
          </TabsList>

          <TabsContent value="uploads" className="mt-4 space-y-3">
            {myUploads.map((file, i) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 card-hover"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success/10">
                  <FileText className="h-5 w-5 text-success" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{file.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <Badge variant="secondary" className="text-[10px] bg-secondary text-muted-foreground">{file.subject}</Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />{file.date}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground shrink-0">
                  <Download className="h-3.5 w-3.5" />
                  {file.downloads}
                </div>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="downloads" className="mt-4 space-y-3">
            {myDownloads.map((file, i) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 card-hover"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{file.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <Badge variant="secondary" className="text-[10px] bg-secondary text-muted-foreground">{file.subject}</Badge>
                    <span className="text-xs text-muted-foreground">by {file.uploader}</span>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                  <Calendar className="h-3 w-3" />{file.date}
                </span>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
