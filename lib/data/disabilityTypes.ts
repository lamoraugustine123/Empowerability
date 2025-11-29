import { DisabilityType } from '@/lib/types/user';

export const disabilityTypes: DisabilityType[] = [
  {
    id: 'visual_impairment',
    name: 'Visual Impairment',
    description: 'Includes blindness, low vision, and color blindness',
    category: 'sensory'
  },
  {
    id: 'hearing_impairment',
    name: 'Hearing Impairment',
    description: 'Includes deafness and hard of hearing',
    category: 'sensory'
  },
  {
    id: 'mobility_impairment',
    name: 'Mobility Impairment',
    description: 'Includes wheelchair users and limited mobility',
    category: 'physical'
  },
  {
    id: 'cognitive_disability',
    name: 'Cognitive Disability',
    description: 'Includes learning disabilities, ADHD, and memory issues',
    category: 'cognitive'
  },
  {
    id: 'autism_spectrum',
    name: 'Autism Spectrum',
    description: 'Includes ASD and related conditions',
    category: 'developmental'
  },
  {
    id: 'mental_health',
    name: 'Mental Health Condition',
    description: 'Includes depression, anxiety, bipolar disorder',
    category: 'mental_health'
  },
  {
    id: 'speech_impairment',
    name: 'Speech Impairment',
    description: 'Includes speech disorders and communication challenges',
    category: 'communication'
  },
  {
    id: 'multiple_disabilities',
    name: 'Multiple Disabilities',
    description: 'Combination of two or more disabilities',
    category: 'multiple'
  },
  {
    id: 'other',
    name: 'Other Disability',
    description: 'Other types of disabilities not listed',
    category: 'other'
  }
];
