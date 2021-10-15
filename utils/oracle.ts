const baseUrl = "http://ec2-3-9-18-254.eu-west-2.compute.amazonaws.com:30254"

export async function setUpcomingTxn(userEventDataAccount: string) {
    const res = await fetch(baseUrl + "/insert?accountId=" + userEventDataAccount)
}