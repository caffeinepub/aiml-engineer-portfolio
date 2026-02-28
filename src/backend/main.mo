import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";

actor {
  // Data types
  type Message = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type FAQEntry = {
    question : Text;
    answer : Text;
  };

  // Storage
  var visitorCount = 0;
  let messages = Map.empty<Text, Message>();
  let faqEntries = Map.empty<Text, FAQEntry>();

  // Contact Messages
  public shared ({ caller }) func submitMessage(name : Text, email : Text, message : Text) : async () {
    let timestamp = Time.now();
    let id = timestamp.toText();
    let newMessage : Message = {
      name;
      email;
      message;
      timestamp;
    };
    messages.add(id, newMessage);
  };

  public query ({ caller }) func getMessages() : async [Message] {
    messages.values().toArray();
  };

  // Visitor Counter
  public shared ({ caller }) func incrementVisitorCount() : async Nat {
    visitorCount += 1;
    visitorCount;
  };

  public query ({ caller }) func getVisitorCount() : async Nat {
    visitorCount;
  };

  // FAQ/Chatbot
  public shared ({ caller }) func addFAQEntry(question : Text, answer : Text) : async () {
    let newEntry : FAQEntry = {
      question;
      answer;
    };
    faqEntries.add(question, newEntry);
  };

  public query ({ caller }) func getFAQAnswer(keyword : Text) : async ?Text {
    let matchingEntry = faqEntries.entries().find(func((q, _)) { q.contains(#text keyword) });
    switch (matchingEntry) {
      case (?(k, entry)) { ?entry.answer };
      case (null) { null };
    };
  };

  public query ({ caller }) func getAllFAQEntries() : async [FAQEntry] {
    faqEntries.values().toArray();
  };

  // Initialize with FAQ data
  public shared ({ caller }) func addInitialFAQEntries() : async () {
    let initialEntries = [
      (
        "What is AIML?",
        "AIML stands for Artificial Intelligence and Machine Learning."
      ),
      (
        "What services do you offer?",
        "I offer AI model development, data analysis, and consulting services."
      ),
    ];
    for ((question, answer) in initialEntries.values()) {
      let newEntry : FAQEntry = { question; answer };
      faqEntries.add(question, newEntry);
    };
  };
};
