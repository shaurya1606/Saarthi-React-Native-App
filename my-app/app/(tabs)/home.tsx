import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';

const { width } = Dimensions.get('window');

const CycleRow = ({ days, startDate, endDate, dots }) => (
  <TouchableOpacity style={styles.cycleRow}>
    <View style={styles.cycleInfo}>
      <Text style={styles.cycleDays}>{days} days</Text>
      <Text style={styles.cycleDates}>{startDate} - {endDate}</Text>
    </View>
    <View style={styles.dotContainer}>
      {dots.map((type, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            type === 'period' && styles.periodDot,
            type === 'fertile' && styles.fertileDot,
          ]}
        />
      ))}
    </View>
    <Text style={styles.chevron}>›</Text>
  </TouchableOpacity>
);

const TrendGraph = () => (
  <View style={styles.trendContainer}>
    <Text style={styles.trendTitle}>Cycle trends</Text>
    <View style={styles.trendBox}>
      <Text style={styles.trendDescription}>
        Your last 6 complete cycles were within the{' '}
        <Text style={styles.normalText}>normal</Text> range. See the graph below for your cycle trend.
      </Text>
      <View style={styles.graph}>
        {/* Placeholder for graph - would use a proper charting library in production */}
        <View style={styles.graphLine} />
        <View style={[styles.graphDot, { left: '10%', top: '40%' }]} />
        <View style={[styles.graphDot, { left: '25%', top: '50%' }]} />
        <View style={[styles.graphDot, { left: '40%', top: '45%' }]} />
        <View style={[styles.graphDot, { left: '55%', top: '55%' }]} />
        <View style={[styles.graphDot, { left: '70%', top: '35%' }]} />
        <View style={[styles.graphDot, { left: '85%', top: '60%' }]} />
      </View>
      <View style={styles.graphLabels}>
        <Text style={styles.graphLabel}>Oct 3{'\n'}2024</Text>
        <Text style={styles.graphLabel}>Nov 11{'\n'}2024</Text>
        <Text style={styles.graphLabel}>Dec 10{'\n'}2024</Text>
        <Text style={styles.graphLabel}>Jan 9{'\n'}2025</Text>
        <Text style={styles.graphLabel}>Feb 12{'\n'}2025</Text>
        <Text style={styles.graphLabel}>Mar 10{'\n'}2025</Text>
      </View>
      <Text style={styles.graphNote}>Within a normal range (21-35 days)</Text>
    </View>
  </View>
);

const WeekCalendar = () => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const dates = [14, 15, 16, 17, 18, 19, 20];
  const currentDate = 18;

  return (
    <View style={styles.calendarContainer}>
      <Text style={styles.dateHeader}>18 April</Text>
      <View style={styles.weekContainer}>
        <View style={styles.daysRow}>
          {days.map((day, index) => (
            <View key={day + index} style={styles.dayCell}>
              <Text style={styles.dayText}>{day}</Text>
              <View style={[
                styles.dateCell,
                dates[index] === currentDate && styles.activeDateCell,
              ]}>
                <Text style={[
                  styles.dateText,
                  dates[index] === currentDate && styles.activeDateText,
                ]}>{dates[index]}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const HealthInfo = () => (
  <View style={styles.healthContainer}>
    <View style={styles.periodInfo}>
      <Text style={styles.periodTitle}>Period in</Text>
      <Text style={styles.periodDays}>2 days</Text>
      <TouchableOpacity style={styles.logButton}>
        <Text style={styles.logButtonText}>Log period</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <View style={styles.statHeader}>
          <Text style={styles.statTitle}>Previous cycle length</Text>
          <Text style={styles.infoIcon}>ⓘ</Text>
        </View>
        <View style={styles.statContent}>
          <Text style={styles.statValue}>30 days</Text>
          <Text style={styles.normalTag}>NORMAL</Text>
        </View>
      </View>

      <View style={styles.statItem}>
        <View style={styles.statHeader}>
          <Text style={styles.statTitle}>Previous period length</Text>
          <Text style={styles.infoIcon}>ⓘ</Text>
        </View>
        <View style={styles.statContent}>
          <Text style={styles.statValue}>5 days</Text>
          <Text style={styles.normalTag}>NORMAL</Text>
        </View>
      </View>

      <View style={styles.statItem}>
        <View style={styles.statHeader}>
          <Text style={styles.statTitle}>Cycle length variation</Text>
          <Text style={styles.infoIcon}>ⓘ</Text>
        </View>
        <View style={styles.statContent}>
          <Text style={styles.statValue}>30-35 days</Text>
          <Text style={styles.normalTag}>NORMAL</Text>
        </View>
      </View>
    </View>
  </View>
);

export default function HomeScreen() {
  const router = useRouter();

  const currentCycleDots = Array(8).fill('period').concat(Array(20).fill('none'));
  const previousCycleDots = Array(6).fill('period')
    .concat(Array(8).fill('none'))
    .concat(Array(6).fill('fertile'))
    .concat(Array(10).fill('none'));
  const olderCycleDots = Array(6).fill('period')
    .concat(Array(12).fill('none'))
    .concat(Array(8).fill('fertile'))
    .concat(Array(9).fill('none'));

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <WeekCalendar />
        <HealthInfo />
        
        <View style={styles.cycleSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Cycle history</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all ›</Text>
            </TouchableOpacity>
          </View>

          <CycleRow
            days={6}
            startDate="Started Apr 18"
            dots={currentCycleDots}
          />
          <CycleRow
            days={30}
            startDate="Mar 19"
            endDate="Apr 17"
            dots={previousCycleDots}
          />
          <CycleRow
            days={35}
            startDate="Feb 12"
            endDate="Mar 18"
            dots={olderCycleDots}
          />
        </View>

        <TrendGraph />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E1',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  cycleSection: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  seeAll: {
    fontSize: 14,
    color: '#666',
  },
  cycleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  cycleInfo: {
    width: 120,
  },
  cycleDays: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cycleDates: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  dotContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
  },
  periodDot: {
    backgroundColor: '#FF1493',
  },
  fertileDot: {
    backgroundColor: '#4CAF50',
  },
  chevron: {
    fontSize: 24,
    color: '#666',
    marginLeft: 8,
  },
  trendContainer: {
    marginBottom: 24,
  },
  trendTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  trendBox: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
  },
  trendDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 24,
  },
  normalText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  graph: {
    height: 200,
    marginBottom: 16,
    position: 'relative',
  },
  graphLine: {
    position: 'absolute',
    top: '50%',
    left: '10%',
    right: '10%',
    height: 2,
    backgroundColor: '#FF69B4',
    opacity: 0.3,
  },
  graphDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF1493',
  },
  graphLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    marginBottom: 16,
  },
  graphLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  graphNote: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  calendarContainer: {
    padding: 16,
  },
  dateHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  weekContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCell: {
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  dateCell: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDateCell: {
    backgroundColor: '#FF69B4',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  activeDateText: {
    color: '#FFF',
  },
  healthContainer: {
    padding: 16,
  },
  periodInfo: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  periodTitle: {
    fontSize: 18,
    color: '#666',
  },
  periodDays: {
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  logButton: {
    backgroundColor: '#FF1493',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
  },
  logButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    marginBottom: 16,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
  },
  infoIcon: {
    fontSize: 16,
    color: '#666',
  },
  statContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  normalTag: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
}); 