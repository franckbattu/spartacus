/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const savedCartTranslations: TranslationResources = {
  en,
};

// expose all translation chunk mapping for savedCart feature
export const savedCartTranslationChunksConfig: TranslationChunksConfig = {
  savedCart: [
    'savedCartDetails',
    'savedCartList',
    'savedCartCartPage',
    'savedCartDialog',
    'addToSavedCart',
  ],
};
