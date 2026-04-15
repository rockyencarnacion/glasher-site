import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const COLORS = {
  bg: "#f5efe6",
  card: "#ffffff",
  cardBorder: "#e3dccf",
  navy: "#7dd3fc",
  ink: "#1a1a1a",
  body: "#555555",
  muted: "#8b857a",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.bg,
    color: COLORS.ink,
    fontFamily: "Helvetica",
    padding: 32,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 18,
  },
  eyebrow: {
    fontSize: 8,
    letterSpacing: 3,
    color: COLORS.navy,
    textTransform: "uppercase",
    marginBottom: 4,
    fontFamily: "Helvetica-Bold",
  },
  hero: {
    fontSize: 52,
    fontFamily: "Helvetica-Bold",
    color: COLORS.ink,
    letterSpacing: 5,
    lineHeight: 1,
  },
  subtitle: {
    fontSize: 9,
    color: COLORS.navy,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 8,
    fontFamily: "Helvetica-Bold",
  },
  photoRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  photo: {
    width: "33%",
    height: 150,
    objectFit: "contain",
    borderRadius: 6,
    backgroundColor: COLORS.card,
    border: `1pt solid ${COLORS.cardBorder}`,
    padding: 4,
  },
  twoCol: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  col: {
    flex: 1,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    border: `1pt solid ${COLORS.cardBorder}`,
    padding: 16,
    marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 8,
    letterSpacing: 3,
    color: COLORS.navy,
    textTransform: "uppercase",
    marginBottom: 10,
    paddingBottom: 6,
    borderBottom: `0.75pt solid ${COLORS.cardBorder}`,
    fontFamily: "Helvetica-Bold",
  },
  bioText: {
    fontSize: 9.5,
    fontFamily: "Helvetica",
    lineHeight: 1.55,
    color: COLORS.body,
    marginBottom: 6,
  },
  bioTagline: {
    fontSize: 9,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
    color: COLORS.navy,
  },
  statsRow: {
    flexDirection: "row",
    gap: 6,
  },
  statCell: {
    flex: 1,
    backgroundColor: COLORS.bg,
    border: `0.75pt solid ${COLORS.cardBorder}`,
    borderRadius: 6,
    padding: 10,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: COLORS.ink,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 6.5,
    letterSpacing: 1.2,
    color: COLORS.navy,
    textTransform: "uppercase",
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
  },
  chartRow: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  chartCover: {
    width: 84,
    height: 84,
    borderRadius: 6,
    objectFit: "cover",
    border: `1pt solid ${COLORS.cardBorder}`,
  },
  chartNumber: {
    fontSize: 52,
    fontFamily: "Helvetica-Bold",
    color: COLORS.ink,
    lineHeight: 1,
  },
  chartCaption: {
    fontSize: 8.5,
    color: COLORS.navy,
    marginTop: 4,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  contactRow: {
    flexDirection: "row",
    gap: 8,
  },
  contactCell: {
    flex: 1,
    backgroundColor: COLORS.bg,
    border: `0.75pt solid ${COLORS.cardBorder}`,
    borderRadius: 6,
    padding: 14,
    alignItems: "center",
  },
  contactLabel: {
    fontSize: 7,
    letterSpacing: 2,
    color: COLORS.navy,
    textTransform: "uppercase",
    marginBottom: 4,
    fontFamily: "Helvetica-Bold",
  },
  contactEmail: {
    fontSize: 11,
    color: COLORS.ink,
    fontFamily: "Helvetica-Bold",
  },
  footer: {
    marginTop: 8,
    fontSize: 6.5,
    color: COLORS.muted,
    textAlign: "center",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
});

export interface PressKitData {
  photos: string[];
  chartCover: string;
  stats: { label: string; value: string }[];
}

export function PressKitDocument({ data }: { data: PressKitData }) {
  return (
    <Document title="GLASHER — Press Kit" author="GLASHER">
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.eyebrow}>Electronic Press Kit</Text>
            <Text style={styles.hero}>GLASHER</Text>
          </View>
          <Text style={styles.subtitle}>Music Artist • Producer • Creative</Text>
        </View>

        <View style={styles.photoRow}>
          {data.photos.map((src, i) => (
            <Image key={i} src={src} style={styles.photo} />
          ))}
        </View>

        <View style={styles.twoCol}>
          <View style={[styles.card, styles.col, { marginBottom: 0 }]}>
            <Text style={styles.sectionLabel}>Chart Highlight</Text>
            <View style={styles.chartRow}>
              <Image src={data.chartCover} style={styles.chartCover} />
              <View>
                <Text style={styles.chartNumber}>#5</Text>
                <Text style={styles.chartCaption}>
                  Beatport{"\n"}New Trap / Future Bass
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.card, styles.col, { marginBottom: 0 }]}>
            <Text style={styles.sectionLabel}>By the Numbers</Text>
            <View style={styles.statsRow}>
              {data.stats.map((s) => (
                <View key={s.label} style={styles.statCell}>
                  <Text style={styles.statNumber}>{s.value}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Bio</Text>
          <Text style={styles.bioText}>
            Music for the space between feeling everything and saying nothing —
            “hard enough for the floor, honest enough to stay with you after.”
          </Text>
          <Text style={styles.bioText}>
            GLASHER is an emerging electronic music producer operating at the
            intersection of Trap and Future Bass (and known to get “housey”).
            With releases through Dim Mak Records (Steve Aoki&apos;s storied
            label), a Beatport charting single, and multiple guest mix spots at
            Dim Mak Studios on iHeart Radio, GLASHER is building early-stage
            momentum with credible industry validation behind him.
          </Text>
          <Text style={styles.bioTagline}>
            GLASHER, the phonetic of &apos;glacier&apos;, an extremely large
            mass of ice which moves very slowly, often down a mountain valley.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Contact</Text>
          <View style={styles.contactRow}>
            <View style={styles.contactCell}>
              <Text style={styles.contactLabel}>Booking</Text>
              <Text style={styles.contactEmail}>rocky@glasher.com</Text>
            </View>
            <View style={styles.contactCell}>
              <Text style={styles.contactLabel}>Management</Text>
              <Text style={styles.contactEmail}>rocky@glasher.com</Text>
            </View>
          </View>
        </View>

        <Text style={styles.footer}>glasher.com — Press photos courtesy of DIM MAK Records</Text>
      </Page>
    </Document>
  );
}
