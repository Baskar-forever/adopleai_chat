"use client";

import { ErrorCallout } from "@/components/ErrorCallout";
import { FiPlusSquare } from "react-icons/fi";
import { ThreeDotsLoader } from "@/components/Loading";
import { InstantSSRAutoRefresh } from "@/components/SSRAutoRefresh";
import { AdminPageTitle } from "@/components/admin/Title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SourceIcon } from "@/components/SourceIcon";
import { SlackBotTable } from "./SlackBotTable";
import { useSlackBots } from "./[bot-id]/hooks";

const Main = () => {
  const {
    data: slackBots,
    isLoading: isSlackBotsLoading,
    error: slackBotsError,
  } = useSlackBots();

  if (isSlackBotsLoading) {
    return <ThreeDotsLoader />;
  }

  if (slackBotsError || !slackBots) {
    const errorMsg =
      slackBotsError?.info?.message ||
      slackBotsError?.info?.detail ||
      "An unknown error occurred";

    return (
      <ErrorCallout errorTitle="Error loading apps" errorMsg={`${errorMsg}`} />
    );
  }

  return (
    <div className="mb-8">
      {/* {popup} */}

      <p className="mb-2 text-sm text-muted-foreground">
        Setup Slack bots that connect to adople chat. Once setup, you will be able
        to ask questions to adople chat directly from Slack. Additionally, you can:
      </p>

      <div className="mb-2">
        <ul className="list-disc mt-2 ml-4 text-sm text-muted-foreground">
          <li>
            Setup AdopleBot to automatically answer questions in certain
            channels.
          </li>
          <li>
            Choose which document sets AdopleBot should answer from, depending
            on the channel the question is being asked.
          </li>
          <li>
            Directly message AdopleBot to search just as you would in the web
            UI.
          </li>
        </ul>
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        Follow the{" "}
        guide
        found in the documentation to get started!
      </p>

      <Link
        className="
            flex
            py-2
            px-4
            mt-2
            border
            border-border
            h-fit
            cursor-pointer
            hover:bg-hover
            text-sm
            w-40
          "
        href="/admin/bots/new"
      >
        <div className="mx-auto flex">
          <FiPlusSquare className="my-auto mr-2" />
          New Slack Bot
        </div>
      </Link>

      <SlackBotTable slackBots={slackBots} />
    </div>
  );
};

const Page = () => {
  return (
    <div className="container mx-auto">
      <AdminPageTitle
        icon={<SourceIcon iconSize={36} sourceType={"slack"} />}
        title="Slack Bots"
      />
      <InstantSSRAutoRefresh />

      <Main />
    </div>
  );
};

export default Page;
