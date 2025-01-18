<script setup>
</script>
<template>
  <div>
    <h1>Privacy Policy for Calystone</h1>

    <p>Effective Date: 2025-01-18</p>

    <h2>Introduction</h2>
    <p>Calystone (“we,” “us,” or “our”) is an open-source self-management app centered around user-controlled files. This Privacy Policy explains how we access, use, store, or share data from users of our application, including data accessed through third-party cloud providers Google Drive, OneDrive and Dropbox (from now on called "file services"), and your local file system.</p>

    <h2>Data We Access</h2>
    <p>Calystone offers optional integration with file services. When you grant our app access to these services, we may request permissions necessary to read, edit, and save files in your chosen storage account. This data is only used to provide core Calystone functionality: displaying your folders and files, allowing you to create, edit, and organize content.</p>

    <h2>Use of File Services (Google Drive, OneDrive, Dropbox) User Data</h2>
    <p>When you connect Calystone with file services, we request OAuth tokens to access files within the choosen service. We use these tokens solely to: Read files or folders you open through the app and Create or update files when you choose to do so.</p>
    <p>
      We do not use the file service user data for advertising, nor do we share or sell this data. Our access to file service data adheres to theirs limited use requirements and is restricted to what is necessary to operate Calystone’s file organization and note editing features. We store access tokens only within your browser session or local storage to maintain functionality. We do not send tokens or file data to any external server.
    </p>

    <h2>Local File System Access</h2>
    <p>Calystone can also use your web browser’s File System Access API to read or write files locally on your computer. We do not transmit or store these local files elsewhere. All interactions with your local files happen directly on your device.</p>

    <h2>How We Store and Share Data</h2>
    <p>We do not operate a separate Calystone own cloud servers to store or process your files. All data remains in: Your local file system, if using the File System Access API and Your chosen file service, if using Goole Drive, OneDrive, or Dropbox. We do not share user data with third parties, except as necessary for performing the requested file operations via the authorized APIs.</p>

    <h2>Security Measures</h2>
    <p>As an open-source project, we strive to use industry-standard security measures such as HTTPS when communicating with cloud APIs. However, Calystone is still in early development. We do not guarantee perfect security or stability. You are responsible for reviewing the security and privacy practices of any third-party cloud providers you choose to use with Calystone.</p>

    <h2>Limited Use and Compliance</h2>
    <p>Our use of Google user data complies with Google’s API Services User Data Policy, including its Limited Use requirements. We also comply with Microsoft’s and Dropbox’s usage guidelines for OneDrive and Dropbox respectively. Our use of user data is restricted to the practices described in this Privacy Policy. We do not allow humans to read or analyze your file even so because we have no access to it.</p>

    <h2>User Consent and Control</h2>
    <p>By using Calystone, you consent to the data practices described in this Privacy Policy. You can revoke Calystone’s access to your file services at any time through your cloud provider’s account settings. You may also clear local browser storage to remove any locally stored tokens or app data.</p>

    <h2>Changes to This Privacy Policy</h2>
    <p>We may update this Privacy Policy to reflect new features or legal requirements. Any changes will be posted here with a revised “Effective Date.” Your continued use of Calystone after we post an updated Privacy Policy means you accept those changes.</p>

    <h2>Contact</h2>
    <p>If you have any questions about this Privacy Policy or how Calystone uses your data, please contact us via the project’s GitHub page or other communication channels listed on the homepage.</p>

    <div class="page-privacy-home">
      <router-link :to="{ name: 'open' }">
        Back to Home
      </router-link>
    </div>
  </div>
</template>
<style scoped>
h2 {
  font-size: var(--font-size-2);
}

p {
  margin-block-end: var(--size-3);
}

.page-privacy-home {
  text-align: end;
}
</style>