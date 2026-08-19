import { ProgressBar } from "@/components/ProgressBar2";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Alert, StyleSheet, Text, View } from "react-native";
import Svg, { Polygon } from "react-native-svg";

export default function ConfirmationScreen() {
  const show = (message: string) => {
    Alert.alert("Badge Info", message);
  };
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Your Badges</Text>

      <Text style={styles.description}>
        Earn star badges by exploring third places and trying new experiences.
        Press the badges to see what you need to do to earn them.
      </Text>

      {/* FOODIE */}
      <View style={styles.badgeSection}>
        <Text style={styles.badgeTitle}>Foodie</Text>

        <View style={styles.iconsRow}>
          {/* Level 1 - Star */}
          <View
            style={styles.star}
            onTouchStart={() => show("Try food at 5 third places")}
          >
            <Svg width="80" height="80" viewBox="0 0 100 100">
              <Polygon
                points="50,5 61,35 95,35 68,55 78,90 50,70 22,90 32,55 5,35 39,35"
                fill="#ce9fa7"
              />
            </Svg>

            <Ionicons
              name="pizza-outline"
              size={28}
              color="#fffcf2"
              style={styles.starIcon}
            />
          </View>

          {/* Level 2 */}
          <View
            style={styles.circle2}
            onTouchStart={() => show("Try food at 10 third places")}
          >
            <Ionicons name="pizza-outline" size={28} color="#fffcf2" />
          </View>

          {/* Level 3 */}
          <View
            style={styles.circle3}
            onTouchStart={() => show("Try food at 20 third places")}
          >
            <Ionicons name="pizza-outline" size={28} color="#fffcf2" />
          </View>

          {/* Level 4 */}
          <View
            style={styles.circle4}
            onTouchStart={() => show("Try food at 50 third places")}
          >
            <Ionicons name="pizza-outline" size={28} color="#fffcf2" />
          </View>
        </View>

        <ProgressBar progress={10} />
        <Text style={styles.badgeDescription}>
          Progress: 10% (1/10 third places)
        </Text>
      </View>

      {/* Sports */}
      <View style={styles.badgeSection}>
        <Text style={styles.badgeTitle}>Sports</Text>

        <View style={styles.iconsRow}>
          {/* Level 1 */}
          <View
            style={styles.circle5}
            onTouchStart={() =>
              show("Watch 3 different matches at a third place")
            }
          >
            <Ionicons name="football-outline" size={28} color="#fffcf2" />
          </View>

          {/* Level 2 */}
          <View
            style={styles.circle6}
            onTouchStart={() =>
              show("Watch 10 different matches at a third place")
            }
          >
            <Ionicons name="football-outline" size={28} color="#fffcf2" />
          </View>

          {/* Level 3 */}
          <View
            style={styles.circle7}
            onTouchStart={() =>
              show("Watch 20 different matches at a third place")
            }
          >
            <Ionicons name="football-outline" size={28} color="#fffcf2" />
          </View>

          {/* Level 4 */}
          <View
            style={styles.circle8}
            onTouchStart={() =>
              show("Watch 50 different matches at a third place")
            }
          >
            <Ionicons name="football-outline" size={28} color="#fffcf2" />
          </View>
        </View>

        <ProgressBar progress={66} />
        <Text style={styles.badgeDescription}>
          Progress: 66% (2/3 third places)
        </Text>
      </View>

      {/* ENTERTAINMENT */}
      <View style={styles.badgeSection}>
        <Text style={styles.badgeTitle}>Entertainment</Text>

        <View style={styles.iconsRow}>
          {/* Level 1 */}
          <View
            style={styles.circle9}
            onTouchStart={() => show("Attend 3 third place events")}
          >
            <Ionicons name="ticket-outline" size={28} color="#fffcf2" />
          </View>

          {/* Level 2 */}
          <View
            style={styles.circle10}
            onTouchStart={() => show("Attend 10 third place events")}
          >
            <Ionicons name="ticket-outline" size={28} color="#fffcf2" />
          </View>

          {/* Level 3 */}
          <View
            style={styles.circle11}
            onTouchStart={() => show("Attend 20 third place events")}
          >
            <Ionicons name="ticket-outline" size={28} color="#fffcf2" />
          </View>

          {/* Level 4 */}
          <View
            style={styles.circle12}
            onTouchStart={() => show("Attend 50 third place events")}
          >
            <Ionicons name="ticket-outline" size={28} color="#fffcf2" />
          </View>
        </View>
        <ProgressBar progress={33} />
        <Text style={styles.badgeDescription}>
          Progress: 33% (1/3 third places)
        </Text>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Complete all badges to become a London third place expert!
      </Text>
    </View>
  );
}

// Defines the confirmation screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffcf2",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#6F6C43",
    marginBottom: 8,
  },

  description: {
    color: "#6F6C43",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginHorizontal: 20,
    marginBottom: 12,
  },

  badgeSection: {
    width: "100%",
    alignItems: "center",
    marginVertical: 6,
  },

  badgeTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#6F6C43",
    marginBottom: 2,
  },

  iconsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  badgeDescription: {
    color: "#6F6C43",
    fontSize: 11,
    textAlign: "center",
    marginTop: 3,
    marginHorizontal: 10,
  },

  /* STAR */

  star: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  starIcon: {
    position: "absolute",
  },

  /* FOOD */

  circle2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#bdcfd3",
    justifyContent: "center",
    alignItems: "center",
  },

  circle3: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#6F6C43",
    justifyContent: "center",
    alignItems: "center",
  },

  circle4: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#b03924",
    justifyContent: "center",
    alignItems: "center",
  },

  /* FOOTBALL */

  circle5: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ce9fa7",
    justifyContent: "center",
    alignItems: "center",
  },

  circle6: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#bdcfd3",
    justifyContent: "center",
    alignItems: "center",
  },

  circle7: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#6F6C43",
    justifyContent: "center",
    alignItems: "center",
  },

  circle8: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#b03924",
    justifyContent: "center",
    alignItems: "center",
  },

  /* ENTERTAINMENT */

  circle9: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ce9fa7",
    justifyContent: "center",
    alignItems: "center",
  },

  circle10: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#bdcfd3",
    justifyContent: "center",
    alignItems: "center",
  },

  circle11: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#6F6C43",
    justifyContent: "center",
    alignItems: "center",
  },

  circle12: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#b03924",
    justifyContent: "center",
    alignItems: "center",
  },

  footer: {
    color: "#6F6C43",
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
});
