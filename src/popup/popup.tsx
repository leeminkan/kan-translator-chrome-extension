import React from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";

import { TranslateTab } from "./component/TranslateTab";
import { WordBankTab } from "./component/WordBankTab";
import "./popup.css";

const Popup = () => {
  return (
    <div className="flex flex-col bg-orange-100 rounded-md">
      <Tabs defaultValue="translate-tab">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="translate-tab">Translate</TabsTrigger>
          <TabsTrigger value="word-bank-tab">Word Bank</TabsTrigger>
        </TabsList>
        <TabsContent value="translate-tab">
          <TranslateTab />
        </TabsContent>
        <TabsContent value="word-bank-tab">
          <WordBankTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Popup;
