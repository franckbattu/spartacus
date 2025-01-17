/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { PageContext } from '@spartacus/core';
import { CmsRoutesImplService } from './cms-routes-impl.service';

// Public injection token for the private implementation of the service `CmsRoutesImplService`.
// After #7070, this class should be replaced with a real implementation.
@Injectable({
  providedIn: 'root',
  useExisting: CmsRoutesImplService,
})
export abstract class CmsRoutesService {
  abstract handleCmsRoutesInGuard(
    pageContext: PageContext,
    componentTypes: string[],
    currentUrl: string,
    currentPageLabel: string
  ): boolean;
}
