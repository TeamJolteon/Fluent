/* eslint-disable react/display-name */

import styled from 'styled-components';
import Image from 'next/image';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import AZURE from '../../config';
const SpeakerImg = styled.div``;
const Phrases = styled.div`
  margin: 20px;
`;
const PhraseTable = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0.5rem;
  line-height: 1.5;
  flex: 1 1 auto;
  border: 1px solid #d0d0d0;
`;
const PronuciationButton = styled.button`
  border-radius: 45%;
`;
const PhraseHeader = styled.div`
  display: none;
  font-weight: 700;
  font-size: 1.1em;
  background-color: #f2f2f2;
`;
const PhraseRow = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
`;

const PhraseData = styled.div`
  display: flex;
  flex-flow: row nowrap;
  flex-grow: 1;
  flex-basis: 0;
  padding: 0.5em;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0px;
  white-space: nowrap;
  border-bottom: 1px solid #d0d0d0;
`;

export default function VocabList() {
  function synthesizeSpeech() {
    const speechConfig = sdk.SpeechConfig.fromSubscription(AZURE, 'westus');
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

    synthesizer.speakTextAsync(
      'No I did not do any coding yesterday',
      (result) => {
        synthesizer.close();
        return result.audioData;
      },
      (error) => {
        console.log(error);
        synthesizer.close();
      }
    );
  }

  return (
    <div>
      <Phrases>
        <PhraseTable>
          <PhraseRow>
            <PhraseData>Language</PhraseData>
            <PhraseData>Pronuciation</PhraseData>
            <PhraseData>English</PhraseData>
            <PhraseData>Status</PhraseData>
            <PhraseData>Source</PhraseData>
          </PhraseRow>
          <PhraseRow>
            <PhraseData>Tack</PhraseData>
            <PhraseData>
              <PronuciationButton onClick={() => synthesizeSpeech()}>
                <VolumeUpIcon />
              </PronuciationButton>
            </PhraseData>
            <PhraseData>Thank you</PhraseData>
            <PhraseData>Beginner</PhraseData>
            <PhraseData>link</PhraseData>
          </PhraseRow>
          <PhraseRow>
            <PhraseData>Badrum</PhraseData>
            <PhraseData>
              <PronuciationButton onClick={() => synthesizeSpeech()}>
                <VolumeUpIcon />
              </PronuciationButton>
            </PhraseData>
            <PhraseData>Bathroom</PhraseData>
            <PhraseData>Intermediate</PhraseData>
            <PhraseData>link</PhraseData>
          </PhraseRow>
          <PhraseRow>
            <PhraseData>Vatten</PhraseData>
            <PhraseData>
              <PronuciationButton onClick={() => synthesizeSpeech()}>
                <VolumeUpIcon />
              </PronuciationButton>
            </PhraseData>
            <PhraseData>Water</PhraseData>
            <PhraseData>Expert</PhraseData>
            <PhraseData>link</PhraseData>
          </PhraseRow>
        </PhraseTable>
      </Phrases>
    </div>
  );
}
