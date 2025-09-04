import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const SuggestionsIndex = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI coffee assistant. I can help you discover new coffees, suggest brewing methods, or answer any coffee-related questions. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const typingAnimation = useRef(new Animated.Value(0)).current;

  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "icon");
  const tintColor = useThemeColor({}, "tint");

  useEffect(() => {
    if (isTyping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(typingAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(typingAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      typingAnimation.setValue(0);
    }
  }, [isTyping]);

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const responses = [
        "That's a great question! Based on your preferences, I'd recommend trying a medium roast Ethiopian coffee with notes of blueberry and chocolate.",
        "Interesting! For that brewing method, I suggest using a coarser grind and water temperature around 195-205°F for optimal extraction.",
        "I'd love to help you explore new coffee origins! Have you tried any single-origin coffees from Central America? They often have bright, citrusy notes.",
        "That sounds like a wonderful coffee experience! The flavor profile you described suggests you might enjoy coffees with floral and fruity characteristics.",
        "For the best coffee experience, I recommend storing your beans in an airtight container away from light and heat. Fresh grinding right before brewing makes a huge difference!",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const aiMessage: Message = {
        id: Date.now().toString(),
        text: randomResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const sendMessage = () => {
    if (inputText.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        isUser: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputText("");

      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);

      // Simulate AI response
      simulateAIResponse(inputText.trim());
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <Animated.View
      style={[
        styles.messageContainer,
        item.isUser ? styles.userMessage : styles.aiMessage,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          {
            backgroundColor: item.isUser ? tintColor : cardColor,
            alignSelf: item.isUser ? "flex-end" : "flex-start",
          },
        ]}
      >
        <ThemedText
          style={[
            styles.messageText,
            {
              color: item.isUser ? "#FFFFFF" : textColor,
            },
          ]}
        >
          {item.text}
        </ThemedText>
        <ThemedText
          style={[
            styles.timestamp,
            {
              color: item.isUser ? "#FFFFFF80" : textColor + "80",
            },
          ]}
        >
          {item.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </ThemedText>
      </View>
    </Animated.View>
  );

  const renderTypingIndicator = () => (
    <Animated.View
      style={[
        styles.messageContainer,
        styles.aiMessage,
        {
          opacity: typingAnimation,
        },
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          {
            backgroundColor: cardColor,
            alignSelf: "flex-start",
          },
        ]}
      >
        <View style={styles.typingContainer}>
          <View
            style={[styles.typingDot, { backgroundColor: textColor + "40" }]}
          />
          <View
            style={[styles.typingDot, { backgroundColor: textColor + "60" }]}
          />
          <View
            style={[styles.typingDot, { backgroundColor: textColor + "80" }]}
          />
        </View>
      </View>
    </Animated.View>
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: cardColor }]}>
          <View style={styles.headerContent}>
            <View style={[styles.avatar, { backgroundColor: tintColor }]}>
              <Ionicons name="cafe" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.headerText}>
              <ThemedText style={styles.headerTitle}>
                Coffee AI Assistant
              </ThemedText>
              <ThemedText style={styles.headerSubtitle}>
                Always here to help
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={isTyping ? renderTypingIndicator : null}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        {/* Input */}
        <View style={[styles.inputContainer, { backgroundColor: cardColor }]}>
          <View
            style={[styles.inputWrapper, { backgroundColor: backgroundColor }]}
          >
            <TextInput
              style={[styles.textInput, { color: textColor }]}
              placeholder="Ask me about coffee..."
              placeholderTextColor={textColor + "60"}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                {
                  backgroundColor: inputText.trim()
                    ? tintColor
                    : textColor + "20",
                },
              ]}
              onPress={sendMessage}
              disabled={!inputText.trim()}
            >
              <Ionicons
                name="send"
                size={20}
                color={inputText.trim() ? "#FFFFFF" : textColor + "60"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default SuggestionsIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: verticalScale(50),
    paddingBottom: verticalScale(15),
    paddingHorizontal: scale(20),
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(12),
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    marginBottom: verticalScale(2),
  },
  headerSubtitle: {
    fontSize: moderateScale(14),
    opacity: 0.7,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
  },
  messageContainer: {
    marginBottom: verticalScale(12),
  },
  userMessage: {
    alignItems: "flex-end",
  },
  aiMessage: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(20),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(22),
    marginBottom: verticalScale(4),
  },
  timestamp: {
    fontSize: moderateScale(12),
    alignSelf: "flex-end",
  },
  typingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(4),
  },
  typingDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    marginHorizontal: scale(2),
  },
  inputContainer: {
    paddingHorizontal: scale(20),
    bottom: verticalScale(100),
    paddingVertical: verticalScale(15),
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    borderRadius: moderateScale(25),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(8),
    minHeight: verticalScale(50),
  },
  textInput: {
    flex: 1,
    fontSize: moderateScale(16),
    maxHeight: verticalScale(100),
    paddingVertical: verticalScale(8),
  },
  sendButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: scale(8),
  },
});
