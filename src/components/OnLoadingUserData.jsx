function OnLoadingUserData(Component) {
    return function LoadingPersonsData({isLoading, ...props}) {
        if (isLoading) return <h1>Подождите, данные загружаются!</h1>

        return <Component {...props} />
    }
}

export default OnLoadingUserData