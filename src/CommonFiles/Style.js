import EStyleSheet from 'react-native-extended-stylesheet';
export const initialAppStyle = EStyleSheet.create({
    wrapper: {
    },
    slide1: {
      flex: 1,
      backgroundColor:'black',
      width: '100%', 
      height: '100%'
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
      backgroundColor: '#3f51b5'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    }
});