import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Moon, Sun } from "lucide-react";

interface Book {
  id: number;
  title: string;
}

const books: Book[] = [
  { id: 1, title: "Java" },
  { id: 2, title: "Python" },
  { id: 3, title: "HTML5" },
  { id: 4, title: "CSS3" },
  { id: 5, title: "Java" },
  { id: 6, title: "Python" },
  { id: 7, title: "HTML5" },
  { id: 8, title: "React JS" },
  { id: 9, title: "Node JS" },
  { id: 10, title: "Java" },
];

const getBookColor = (title: string): string => {
  const colors: { [key: string]: string } = {
    Java: "bg-red-600",
    Python: "bg-blue-600",
    HTML5: "bg-orange-600",
    CSS3: "bg-purple-600",
    "React JS": "bg-cyan-600",
    "Node JS": "bg-green-600",
  };
  return colors[title] || "bg-gray-600";
};

export default function BookLibraryMap() {
  const [selectedBookId, setSelectedBookId] = useState<string>("");
  const [pulsingBookId, setPulsingBookId] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setPulsingBookId(null);
  }, [selectedBookId]);

  const handleCheck = () => {
    if (selectedBookId) {
      setPulsingBookId(Number(selectedBookId));
    }
  };

  const firstRowBooks = books.slice(0, 5);
  const secondRowBooks = books.slice(5, 10);

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className={`w-[580px] h-[600px] p-4 ${isDarkMode ? "bg-black" : "bg-white"}`}>
          <div className="text-center mb-4 relative">
            <Button
              onClick={() => setIsDarkMode(!isDarkMode)}
              variant="outline"
              size="sm"
              className={`absolute right-0 top-0 ${
                isDarkMode
                  ? "bg-black border-gray-700 text-white hover:bg-gray-900 hover:text-white"
                  : "bg-white border-gray-200 text-black hover:bg-gray-50 hover:text-black"
              }`}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <h1 className={`text-2xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Exploring Map Interface
            </h1>
            <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Understanding Key-Value Pairs with Book Library
            </p>
          </div>

          {/* Control Panel */}
          <div className="flex items-center justify-center gap-4 flex-wrap mb-4">
            <label
              htmlFor="book-select"
              className={`text-base font-semibold ${isDarkMode ? "text-white" : "text-black"}`}
            >
              Book ID:
            </label>
            <Select value={selectedBookId} onValueChange={setSelectedBookId}>
              <SelectTrigger
                className={`w-32 ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-700 text-white"
                    : "bg-white border border-gray-300 text-black"
                }`}
                id="book-select"
              >
                <SelectValue placeholder="Select ID" />
              </SelectTrigger>
              <SelectContent
                className={
                  isDarkMode
                    ? "bg-gray-900 border-gray-700 text-white"
                    : "bg-white border border-gray-300 text-black"
                }
              >
                {books.map((book) => (
                  <SelectItem
                    key={book.id}
                    value={book.id.toString()}
                    className={`${
                      isDarkMode
                        ? "hover:bg-white focus:bg-white text-white"
                        : "hover:bg-gray-100 focus:bg-gray-100 text-black"
                    }`}
                  >
                    {book.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleCheck}
              disabled={!selectedBookId}
              className={`px-6 py-1 ${
                isDarkMode
                  ? "bg-white text-black hover:text-white"
                  : "bg-black text-white hover:bg-white hover:text-black !important"
              }`}
            >
              Check
            </Button>
          </div>

          {/* Book Library */}
          <div className="mb-4">
            <h2
              className={`text-xl font-bold mb-4 text-center ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Book Library Collection
            </h2>

            {/* First Row of Books */}
            <div className="flex justify-center gap-3 mb-4">
              {firstRowBooks.map((book) => {
                const isPulsing = pulsingBookId === book.id;
                const pulseColor = isDarkMode ? "bg-white text-black" : "bg-black text-white";

                return (
                  <div
                    key={book.id}
                    className={`relative transform transition-all duration-300`}
                  >
                    <div
                      className={`w-16 h-28 ${
                        isPulsing ? pulseColor : getBookColor(book.title)
                      } rounded-r-md shadow-lg border-l-4 border-l-gray-200 border-r border-r-gray-800 flex flex-col justify-between p-2 ${
                        isPulsing ? "" : "text-white"
                      } relative overflow-hidden ${
                        isPulsing ? "animate-infinite-pulse" : ""
                      }`}
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>

                      <div
                        className={`text-xs font-bold text-center ${
                          isPulsing ? "bg-opacity-30" : "bg-black bg-opacity-30"
                        } rounded px-1`}
                      >
                        ID: {book.id}
                      </div>

                      <div className="text-xs font-semibold text-center px-1 flex items-center justify-center h-14">
                        <span className="leading-tight">{book.title}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Second Row of Books */}
            <div className="flex justify-center gap-3">
              {secondRowBooks.map((book) => {
                const isPulsing = pulsingBookId === book.id;
                const pulseColor = isDarkMode ? "bg-white text-black" : "bg-black text-white";

                return (
                  <div
                    key={book.id}
                    className={`relative transform transition-all duration-300`}
                  >
                    <div
                      className={`w-16 h-28 ${
                        isPulsing ? pulseColor : getBookColor(book.title)
                      } rounded-r-md shadow-lg border-l-4 border-l-gray-200 border-r border-r-gray-800 flex flex-col justify-between p-2 ${
                        isPulsing ? "" : "text-white"
                      } relative overflow-hidden ${
                        isPulsing ? "animate-infinite-pulse" : ""
                      }`}
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>

                      <div
                        className={`text-xs font-bold text-center ${
                          isPulsing ? "bg-opacity-30" : "bg-black bg-opacity-30"
                        } rounded px-1`}
                      >
                        ID: {book.id}
                      </div>

                      <div className="text-xs font-semibold text-center px-1 flex items-center justify-center h-14">
                        <span className="leading-tight">{book.title}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Map Explanation */}
          <div className="mt-6">
            <h3 className={`text-base font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              How Java Map Works:
            </h3>
            <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              In Java, a Map stores key-value pairs. Here, Book ID is the{" "}
              <strong className={isDarkMode ? "text-white" : "text-black"}>key</strong> and Book
              Title is the <strong className={isDarkMode ? "text-white" : "text-black"}>value</strong>.
              When you search by Book ID (key), you can quickly find the corresponding Book Title
              (value).
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes infinite-pulse {
          0% {
            transform: translateZ(0) scale(1);
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
          }
          50% {
            transform: translateZ(10px) scale(1.05);
            box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.4);
          }
          100% {
            transform: translateZ(0) scale(1);
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }

        @keyframes infinite-pulse-dark {
          0% {
            transform: translateZ(0) scale(1);
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
          }
          50% {
            transform: translateZ(10px) scale(1.05);
            box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.4);
          }
          100% {
            transform: translateZ(0) scale(1);
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
          }
        }

        .animate-infinite-pulse {
          animation: infinite-pulse 1.5s infinite ease-out;
        }

        .dark .animate-infinite-pulse {
          animation: infinite-pulse-dark 1.5s infinite ease-out;
        }

        body {
          background-color: ${isDarkMode ? "#000" : "#fff"};
          transition: background-color 0.3s ease;
        }

        /* Dark mode dropdown content background and text */
        .bg-gray-900 .radix-select-content {
          background-color: #1f2937 !important;
          color: white !important;
        }

        /* Dark mode dropdown item hover and focus */
        .bg-gray-900 .radix-select-content .radix-select-item:hover,
        .bg-gray-900 .radix-select-content .radix-select-item:focus {
          background-color: black !important;
          color: white !important;
        }

        /* Light mode dropdown content background and text */
        .bg-white .radix-select-content {
          background-color: white !important;
          color: black !important;
        }

        /* Light mode dropdown item hover and focus */
        .bg-white .radix-select-content .radix-select-item:hover,
        .bg-white .radix-select-content .radix-select-item:focus {
          background-color: #f3f4f6 !important;
          color: black !important;
        }

        /* Button hover text color fix */
        button:hover {
          color: inherit !important;
        }
      `}</style>  
    </div>
  );
}