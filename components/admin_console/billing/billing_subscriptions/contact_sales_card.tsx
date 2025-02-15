// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {FormattedMessage} from 'react-intl';

import {trackEvent} from 'actions/telemetry_actions';

import {CloudLinks, CloudProducts} from 'utils/constants';
import PrivateCloudSvg from 'components/common/svg_images_components/private_cloud_svg';
import CloudTrialSvg from 'components/common/svg_images_components/cloud_trial_svg';

type Props = {
    contactSalesLink: any;
    isFreeTrial: boolean;
    trialQuestionsLink: any;
    subscriptionPlan: string | undefined;
    onUpgradeMattermostCloud: () => void;
    productsLength: number;
}

const ContactSalesCard = (props: Props) => {
    const {
        contactSalesLink,
        isFreeTrial,
        trialQuestionsLink,
        subscriptionPlan,
        onUpgradeMattermostCloud,
        productsLength,
    } = props;
    let title;
    let description;

    const pricingLink = (
        <a
            href={CloudLinks.PRICING}
            rel='noopener noreferrer'
            target='_blank'
            className='PrivateCloudCard__pricingLink'
            onClick={() => trackEvent('cloud_admin', 'click_pricing_link')}
        >
            {CloudLinks.PRICING}
        </a>
    );

    // prior to releasing the cloud-{(s)tarter,(p)rofessional,(e)nterprise} plans,
    // there is only one product fetched and available on this page, Mattermost Cloud.
    // Mattermost Cloud pre cloud-{s,p,e} release does not have a sku,
    // so we test for it with `productLengths === 1`.
    // Post cloud-{s,p,e} release, Mattermost Cloud has a sku named cloud-legacy,
    // so we test for it with `subscriptionPlan === CloudProducts.LEGACY`.
    // We have to, since post cloud-{s,p,e} we fetch all 4 products.
    const isCloudLegacyPlan = productsLength === 1 || subscriptionPlan === CloudProducts.LEGACY;

    if (isFreeTrial) {
        title = (
            <FormattedMessage
                id='admin.billing.subscription.privateCloudCard.freeTrial.title'
                defaultMessage='Questions about your trial?'
            />
        );
        description = (
            <FormattedMessage
                id='admin.billing.subscription.privateCloudCard.freeTrial.description'
                defaultMessage='We love to work with our customers and their needs. Contact sales for subscription, billing or trial-specific questions.'
            />
        );
    } else if (isCloudLegacyPlan) {
        title = (
            <FormattedMessage
                id='admin.billing.subscription.privateCloudCard.cloudEnterprise.title'
                defaultMessage='Looking for an annual discount? '
            />
        );
        description = (
            <FormattedMessage
                id='admin.billing.subscription.privateCloudCard.cloudEnterprise.description'
                defaultMessage='At Mattermost, we work with you and your team to meet your needs throughout the product. If you are looking for an annual discount, please reach out to our sales team.'
            />
        );
    } else {
        switch (subscriptionPlan) {
        case CloudProducts.STARTER:
            title = (
                <FormattedMessage
                    id='admin.billing.subscription.privateCloudCard.cloudStarter.title'
                    defaultMessage='Upgrade to Cloud Professional'
                />
            );
            description = (
                <FormattedMessage
                    id='admin.billing.subscription.privateCloudCard.cloudStarter.description'
                    defaultMessage='Optimize your processes with Guest Accounts, Office365 suite integrations, GitLab SSO and advanced permissions.'
                />
            );
            break;
        case CloudProducts.PROFESSIONAL:
            title = (
                <FormattedMessage
                    id='admin.billing.subscription.privateCloudCard.cloudProfessional.title'
                    defaultMessage='Upgrade to Cloud Enterprise'
                />
            );
            description = (
                <FormattedMessage
                    id='admin.billing.subscription.privateCloudCard.cloudProfessional.description'
                    defaultMessage='Advanced security and compliance features with premium support. See {pricingLink} for more details.'
                    values={{pricingLink}}
                />
            );
            break;
        case CloudProducts.ENTERPRISE:
            title = (
                <FormattedMessage
                    id='admin.billing.subscription.privateCloudCard.cloudEnterprise.title'
                    defaultMessage='Looking for an annual discount? '
                />
            );
            description = (
                <FormattedMessage
                    id='admin.billing.subscription.privateCloudCard.cloudEnterprise.description'
                    defaultMessage='At Mattermost, we work with you and your team to meet your needs throughout the product. If you are looking for an annual discount, please reach out to our sales team.'
                />
            );
            break;
        default:
            title = (
                <FormattedMessage
                    id='admin.billing.subscription.privateCloudCard.cloudProfessional.title'
                    defaultMessage='Upgrade to Cloud Enterprise'
                />
            );
            description = (
                <FormattedMessage
                    id='admin.billing.subscription.privateCloudCard.cloudProfessional.description'
                    defaultMessage='Advanced security and compliance features with premium support. See {pricingLink} for more details.'
                    values={{pricingLink}}
                />
            );
            break;
        }
    }

    return (
        <div className='PrivateCloudCard'>
            <div className='PrivateCloudCard__text'>
                <div className='PrivateCloudCard__text-title'>
                    {title}
                </div>
                <div className='PrivateCloudCard__text-description'>
                    {description}
                </div>
                {(isFreeTrial || subscriptionPlan === CloudProducts.ENTERPRISE || isCloudLegacyPlan) &&
                    <a
                        href={isFreeTrial ? trialQuestionsLink : contactSalesLink}
                        rel='noopener noreferrer'
                        target='_blank'
                        className='PrivateCloudCard__actionButton'
                        onClick={() => trackEvent('cloud_admin', 'click_contact_sales')}
                    >
                        <FormattedMessage
                            id='admin.billing.subscription.privateCloudCard.contactSales'
                            defaultMessage='Contact Sales'
                        />

                    </a>
                }
                {(!isFreeTrial && productsLength > 1 && subscriptionPlan !== CloudProducts.ENTERPRISE && subscriptionPlan !== CloudProducts.LEGACY) &&
                    <button
                        type='button'
                        onClick={onUpgradeMattermostCloud}
                        className='PrivateCloudCard__actionButton'
                    >
                        <FormattedMessage
                            id='admin.billing.subscription.privateCloudCard.upgradeNow'
                            defaultMessage='Upgrade Now'
                        />
                    </button>
                }
            </div>
            <div className='PrivateCloudCard__image'>
                {isFreeTrial ?
                    <CloudTrialSvg
                        width={170}
                        height={123}
                    /> :
                    <PrivateCloudSvg
                        width={170}
                        height={123}
                    />
                }
            </div>
        </div>
    );
};

export default ContactSalesCard;
