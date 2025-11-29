import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InstallPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-600 hover:text-primary mb-6 sm:mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 sm:mb-6">
              Install GPTArchive
            </h1>

            <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12">
              Follow these simple steps to install GPTArchive and start bookmarking your ChatGPT conversations.
            </p>

            <div className="space-y-8 sm:space-y-12">
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Installation Steps</h2>

                <ol className="space-y-6 sm:space-y-8">
                  <li className="flex items-start">
                    <div className="mr-4 flex-shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-white font-bold">
                        1
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Add to Browser</h3>
                      <p className="text-gray-600">
                        Click the {'"'}Install{'“'} button below and download the extension.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="mr-4 flex-shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-white font-bold">
                        2
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Install the Extension</h3>
                      <p className="text-gray-600">
                        Go to {'"'}Extensions{'“'} section in your browser. Turn on {'"'}Developer Mode{'“'}. Click on {'"'}Load
                        Unpacked{'“'} and select the extension folder you have downloaded.
                      </p>
                      <div className="mt-4 rounded-lg overflow-hidden border border-gray-200 max-w-md mx-auto">
                        <Image
                          src="/load-unpacked-extension.png"
                          alt="Load Unpacked Extension"
                          width={640}
                          height={360}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="mr-4 flex-shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-white font-bold">
                        3
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Pin the Extension (Optional)</h3>
                      <p className="text-gray-600">
                        Click the extensions icon in your browser toolbar, then click the pin icon next to GPTArchive to keep it visible
                        at all times.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="mr-4 flex-shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-white font-bold">
                        4
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Start Using GPTArchive</h3>
                      <p className="text-gray-600">
                        Visit ChatGPT at{' '}
                        <a
                          href="https://chat.openai.com"
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          chat.openai.com
                        </a>
                        , navigate to any conversation, and click the GPTArchive icon in your toolbar to start bookmarking!
                      </p>
                      <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          width={640}
                          height={480}
                          src="/hero.png"
                          alt="Using GPTArchive with ChatGPT"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">How to Use GPTArchive</h2>

                <div className="space-y-6 sm:space-y-8">
                  <div className="p-4 sm:p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Bookmarking a Conversation</h3>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600">
                      <li>Visit ChatGPT and navigate to any conversation.</li>
                      <li>Click the GPTArchive icon in your browser toolbar.</li>
                      <li>Enter a custom title, add tags (comma separated), and write a note.</li>
                      <li>Click the {'"'}Save{'“'} button to bookmark the conversation.</li>
                    </ol>
                  </div>

                  <div className="p-4 sm:p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Managing Your Archive</h3>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600">
                      <li>Click the settings icon in the popup to open the Dashboard.</li>
                      <li><strong>Search & Filter:</strong> Use the search bar or the {'"'}Filter by Tag{'“'} dropdown to find specific chats.</li>
                      <li><strong>Organize:</strong> Edit tags and notes, or delete bookmarks you no longer need.</li>
                      <li><strong>Import/Export:</strong> Use the CSV options to backup your data or move it to another device.</li>
                      <li><strong>Delete All:</strong> Use the {'"'}Delete All{'“'} button to clear your archive (use with caution!).</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12 text-center">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-gray-600 mb-6">Install GPTArchive now and never lose an important ChatGPT conversation again.</p>
              <Link href="/extension.zip" download>
                <Button size="lg" className="group bg-emerald-600 p-4 text-white">
                  <Download className="mr-2 h-5 w-5" /> Install GPTArchive
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}