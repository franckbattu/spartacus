/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { OccCpqConfigurator } from '../cpq-configurator-occ.models';

export const CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER = new InjectionToken<
  Converter<
    Configurator.AddToCartParameters,
    OccCpqConfigurator.AddToCartParameters
  >
>('CpqConfiguratorAddToCartSerializer');

export const CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER = new InjectionToken<
  Converter<
    Configurator.AddToCartParameters,
    OccCpqConfigurator.UpdateConfigurationForCartEntryParameters
  >
>('CpqConfiguratorUpdateCartEntrySerializer');
