import EStyleSheet from 'react-native-extended-stylesheet';
export const initialAppStyle = EStyleSheet.create({
  MusicProfilecontainer: {
    height: 500,
  },
  MusicProfilenavContainer: {
    height: 64,
    marginHorizontal: 10,
  },
  MusicProfilestatusBar: {
    height: 64,
    backgroundColor: 'transparent',
  },
  MusicProfilenavBar: {
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  MusicProfiletitleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  wrapper: {},
  slide1: {
    flex: 1,
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#673ab7',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3f51b5',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  spinnerBtnStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 5,
    height: 50,
    backgroundColor: '#25CAC6',
  },
  spinnerViewStyle: {marginTop: 20, height: 50, width: '80%'},
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
});

export const ProfileStyle = EStyleSheet.create({
  loginContainer: {},
  logo: {
    position: 'relative',
    width: '100%',
    minHeight: 200,
  },
});

export const spinnerBtnConfig = {
  indicatorCount: 10,
  spinnerType: 'BarIndicator',
};

export const animatedLoadinBtnConfig = {
  width: 350,
  marginTop: 15,
  height: 45,
  titleFontSize: 16,
  titleColor: 'rgb(255,255,255)',
  backgroundColor: '#00796b',
  borderRadius: 4,
};
